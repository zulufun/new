const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.')
        return `${result} VND`
    } catch (error) {
        return null
    }
}

const createOrderItemsHtml = (orderItems) => {
    return orderItems.map((item, index) => `
        <tr>
            <td><img src="cid:image${index}" alt="${item.image}" width="50" height="50"></td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${convertPrice(item.price)}</td>
            <td>${convertPrice(item.totalPrice)}</td>
        </tr>
    `).join('');
};

const createEmailHtml = (orderItems) => {
    const itemsHtml = createOrderItemsHtml(orderItems);
    const totalAmount = orderItems.reduce((acc, item) => acc + item.totalPrice, 0);
    return `
        <h1>Thông tin đơn hàng</h1>
        <table border="1">
            <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thành tiền</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
                <tr>
                    <td colspan="4" style="text-align:right; font-weight:bold;">Tổng tiền</td>
                    <td>${convertPrice(totalAmount)}</td>
                </tr>
            </tbody>
        </table>
    `;
};

const sendEmail = async (email, orderItems) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const emailHtml = createEmailHtml(orderItems);
    const attachments = orderItems.map((item, index) => ({
        filename: `image${index}.jpg`,
        path: `http://localhost:3001/uploads/${item.image}`,
        cid: `image${index}` // Same as referenced in the HTML img src
    }));

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: email, // list of receivers
        subject: "Bạn đã đặt hàng tại MTA Store", // Subject line
        text: "Hello world?", // plain text body
        html: emailHtml, // html body
        attachments: attachments
    });
}

module.exports = {
    sendEmail
}