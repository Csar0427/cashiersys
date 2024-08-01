const sampleDb = [
  {
    orderId: 1,
    orders: [
      { order_name: "Kape", quantity: 2 },
      { order_name: "Waffle", quantity: 1 },
    ],
    order_note: "Sample Order Note",
  },
  {
    orderId: 2,
    orders: [
      { order_name: "Waffle", quantity: 3 },
      { order_name: "Cafe Americano", quantity: 2 },
    ],
    order_note: "Sample Order Note",
  },
  {
    orderId: 3,
    orders: [
      { order_name: "Vanilla Coffee", quantity: 1 },
      { order_name: "Iced Cafe Americano", quantity: 2 },
    ],
    order_note: "Sample Order Note",
  },
  {
    orderId: 4,
    orders: [{ order_name: "Blueberry Cheesecake", quantity: 5 }],
    order_note: "Sample Order Note",
  },
  {
    orderId: 5,
    orders: [
      { order_name: "Cafe Americano", quantity: 1 },
      { order_name: "Iced Cafe Americano", quantity: 1 },
      { order_name: "Latte", quantity: 2 },
      { order_name: "Cappucino Frappe", quantity: 1 },
    ],
    order_note: "Sample Order Note",
  },
];

export default sampleDb;
