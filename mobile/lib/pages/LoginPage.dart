import 'package:flutter/material.dart';
import 'package:mobile/models/Login.dart';
import 'package:mobile/models/User.dart';
import 'package:mobile/pages/HomePage.dart';
import 'package:mobile/services/UserService.dart';
import "package:shared_preferences/shared_preferences.dart";

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  UserService userService = UserService();
  Login login = Login();

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const Text(
              'Social App',
              style: TextStyle(
                fontSize: 32.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 20.0),
            TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'Correo Electrónico',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 10.0),
            TextFormField(
              controller: _passwordController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Contraseña',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () async {
                SharedPreferences prefs = await SharedPreferences.getInstance();
                login.setEmail(_emailController.text.trim());
                login.setPassword(_passwordController.text.trim());
                User? user = await userService.signIn(login: login);
                if (user != null) {
                  prefs.setBool("isLoggedIn", true);
                  prefs.setString("token", user.token);
                  prefs.setInt("user_id", user.userId);

                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (BuildContext context) => const HomePage()));
                  return;
                }
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                    content: Text("Verifique el email o la contrasena"),
                    duration: Duration(seconds: 1)));
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 40.0),
              ),
              child: const Text('Iniciar Sesión'),
            ),
            const SizedBox(height: 10.0),
            TextButton(
              onPressed: () {
                // Agregar navegación para olvidar la contraseña
              },
              child: const Text('¿Olvidaste la Contraseña?'),
            ),
            const SizedBox(height: 10.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('¿No tienes una cuenta?'),
                TextButton(
                  onPressed: () {
                    // Agregar navegación para registrarse
                  },
                  child: Text('Regístrate'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
