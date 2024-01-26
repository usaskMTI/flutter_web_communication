import 'package:flutter/material.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WebSocket Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: WebSocketDemoPage(),
    );
  }
}

class WebSocketDemoPage extends StatefulWidget {
  @override
  _WebSocketDemoPageState createState() => _WebSocketDemoPageState();
}

class _WebSocketDemoPageState extends State<WebSocketDemoPage> {
  late WebSocketChannel channel;
  String _data = 'Waiting for data...';

  @override
  void initState() {
    super.initState();
    channel = WebSocketChannel.connect(
      Uri.parse('ws://localhost:5001'),
    );

    channel.stream.listen((data) {
      setState(() {
        _data = data;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('WebSocket Data'),
      ),
      body: Center(
        child: Text(_data),
      ),
    );
  }

  @override
  void dispose() {
    channel.sink.close();
    super.dispose();
  }
}
