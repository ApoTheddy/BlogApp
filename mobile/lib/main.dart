import 'package:flutter/material.dart';
import 'package:mobile/pages/LoginPage.dart';
import 'package:mobile/pages/HomePage.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        theme: ThemeData(
          primaryColor:
              Colors.white, // Color de fondo de la barra de aplicaciones
          scaffoldBackgroundColor:
              Colors.white, // Color de fondo de la pantalla
          visualDensity: VisualDensity.adaptivePlatformDensity,
        ),
        debugShowCheckedModeBanner: false,
        home: FutureBuilder<bool>(
          future: checkLoginStatus(),
          builder: (ctx, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const CircularProgressIndicator();
            } else if (snapshot.hasError) {
              return const Center(child: Text("Ocurrio un error"));
            } else {
              if (snapshot.data == true) {
                return const HomePage();
              } else {
                return const LoginPage();
              }
            }
          },
        ));
  }

  Future<bool> checkLoginStatus() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    bool isLoggedIn = prefs.getBool("isLoggedIn") ?? false;
    return isLoggedIn;
  }
}
