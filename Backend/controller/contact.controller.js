import Contact from "../model/contact.model.js";

export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message Sent Successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
};