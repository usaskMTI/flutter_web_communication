import 'dart:convert';
import 'dart:html';
import 'package:flutter/material.dart';

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
  String _data = 'No data received yet';

  @override
  void initState() {
    super.initState();
    listenForServerEvents();
  }

  void listenForServerEvents() {
    // final eventSource = EventSource('http://localhost:5001/events');
    final eventSource =
        EventSource('https://7468-174-2-250-68.ngrok-free.app/events');

    eventSource.onMessage.listen((event) {
      final data = json.decode(event.data);
      setState(() {
        _data = data['message'];
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter SSE Demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Latest Data from Server:',
              style: Theme.of(context).textTheme.headline6,
            ),
            SizedBox(height: 20),
            Text(
              _data,
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
    );
  }
}
