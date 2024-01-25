import 'dart:convert';
import 'dart:html';
import 'package:flutter/material.dart';
import 'order_class.dart'; // Make sure this import is correct based on your project structure

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter SSE Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: SSEDemoPage(),
    );
  }
}

class SSEDemoPage extends StatefulWidget {
  @override
  _SSEDemoPageState createState() => _SSEDemoPageState();
}

class _SSEDemoPageState extends State<SSEDemoPage> {
  Order? _order; // Replace String _data with an Order object

  @override
  void initState() {
    super.initState();
    listenForServerEvents();
  }

  void listenForServerEvents() {
    final eventSource = EventSource('http://localhost:5001/events');

    eventSource.onMessage.listen((event) {
      final rawData = json.decode(event.data);
      setState(() {
        debugPrint('Received raw data: $rawData');
        _order =
            Order.fromJson(rawData); // Parse the raw data into an Order object
      });
    }, onError: (error) {
      debugPrint('Error in SSE connection: $error');
      setState(() {
        // Handle the error state
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    // Update the UI to display the order details using the _order object
    return Scaffold(
      appBar: AppBar(
        title: Text('Order Details'),
      ),
      body: _order == null
          ? Center(child: Text('Waiting for order data...'))
          : ListView(
              children: [
                Text('Order #${_order!.id}'),
                Text('Status: ${_order!.status}'),
                Text('Total: ${_order!.total}'),
                ..._order!.items.map((item) => ListTile(
                      title: Text(item.name),
                      subtitle: Text('Quantity: ${item.quantity}'),
                      trailing: Text('\$${item.total}'),
                    )),
              ],
            ),
    );
  }
}
