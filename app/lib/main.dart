import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter HTTP Test',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: TestPage(),
    );
  }
}

class TestPage extends StatefulWidget {
  @override
  _TestPageState createState() => _TestPageState();
}

class _TestPageState extends State<TestPage> {
  String _response = '';

  void testHttpRequest() async {
    try {
      final response = await http.get(Uri.parse('http://localhost:5001/test'));
      if (response.statusCode == 200) {
        setState(() {
          _response = response.body;
          debugPrint(response.body);
        });
      } else {
        setState(() {
          _response = 'Failed to load data';
        });
      }
    } catch (e) {
      setState(() {
        _response = 'Error: $e';
        debugPrint(e.toString());
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter HTTP Test'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              onPressed: testHttpRequest,
              child: Text('Test HTTP Request'),
            ),
            SizedBox(height: 20),
            Text(_response),
          ],
        ),
      ),
    );
  }
}
