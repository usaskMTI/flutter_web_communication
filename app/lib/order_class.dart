class Order {
  final int id;
  final String status;
  final String paymentMethodTitle;
  final String total;
  final String tax;
  final String dateCreated;
  final List<OrderItem> items;

  Order({
    required this.id,
    required this.status,
    required this.paymentMethodTitle,
    required this.total,
    required this.tax,
    required this.dateCreated,
    required this.items,
  });

  factory Order.fromJson(Map<String, dynamic> json) {
    var list = json['line_items'] as List;
    List<OrderItem> itemsList = list.map((i) => OrderItem.fromJson(i)).toList();

    return Order(
      id: json['id'],
      status: json['status'],
      paymentMethodTitle: json['payment_method_title'],
      total: json['total'],
      tax: json['total_tax'],
      dateCreated: json['date_created'],
      items: itemsList,
    );
  }
}

class OrderItem {
  final String name;
  final int quantity;
  final String total;

  OrderItem({required this.name, required this.quantity, required this.total});

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      name: json['name'],
      quantity: json['quantity'],
      total: json['total'],
    );
  }
}
