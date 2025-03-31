import Coupon from "../models/coupon.model.js";
import { payment } from "../lib/mercado-pago.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Invalid or empty products array" });
    }

    let totalAmount = 0;

    products.forEach(product => {
      totalAmount += product.price * product.quantity;
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
      if (coupon) {
        totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100);
      }
    }

    const body = {
      transaction_amount: req.transaction_amount,
      token: req.token,
      description: req.description,
      installments: req.installments,
      payment_method_id: req.paymentMethodId,
      issuer_id: req.issuer,
      payer: {
        email: req.email,
        identification: {
          type: req.identificationType,
          number: req.number
        }
      }
    };

    const session = await payment.create({ body });

    res.status(200).json({ id: session.id, status: session.status });

  } catch (error) {
    console.log("Error in createCheckoutSession controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const checkoutSuccess = async (req, res) => {
  const { id } = req.params.id;
  try {
    const { sessionId } = req.body;
    const session = await payment.get({
      id: id,
    })
    if (session.status === "approved") {
      const newOrder = new Order({
        user: session.payer.id,
        products: producst.map(product => ({
          product: product.id,
          quantity: product.quantity,
          price: product.price
        })),
        totalAmount: session.transaction_amount,
        mercadoPagoSessionId: sessionId,
      });
      await newOrder.save();
      res.status(200).json({
        success: true,
        message: "Payment successful, order created, and coupon deactivated if used.",
        orderId: newOrder._id,
      })
    } else {
      res.status(400).json({ message: "Payment not approved" });
    }
  } catch (error) {
    console.log("Error in checkoutSuccess controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}