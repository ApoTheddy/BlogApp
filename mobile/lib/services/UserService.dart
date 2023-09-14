import 'dart:convert';

import 'package:mobile/models/Login.dart';
import "package:http/http.dart" as http;
import 'package:mobile/models/User.dart';

class UserService {
  Future<User?> signIn({required Login login}) async {
    User? user;
    try {
      http.Response response = await http.post(
          Uri.parse("http://192.168.1.6:3000/auth/login"),
          body: login.toJson());

      Map<String, dynamic> dataJson = json.decode(response.body);
      if (response.statusCode == 201) {
        user = User.fromJson(dataJson["user"]);
        user.token = dataJson["token"];
      }
    } catch (err) {
      print(err);
    }
    return user;
  }

  Future<User?> findById(int userId) async {
    User? user;
    try {
      http.Response response =
          await http.get(Uri.parse("http://192.168.1.6:3000/users/$userId"));

      Map<String, dynamic> jsonData = json.decode(response.body);
      if (response.statusCode == 200) {
        user = User.fromJson(jsonData);
      }
    } catch (err) {
      print(err);
    }
    return user;
  }

  Future<User?> findByIdProfile(int userId) async {
    User? user;
    try {
      http.Response response = await http
          .get(Uri.parse("http://192.168.1.6:3000/users/search/$userId"));

      Map<String, dynamic> jsonData = json.decode(response.body);
      if (response.statusCode == 200) {
        user = User.fromJson(jsonData);
      }
    } catch (err) {
      print(err);
    }
    return user;
  }
}
