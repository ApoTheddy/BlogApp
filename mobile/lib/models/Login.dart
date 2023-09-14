class Login {
  late String _email;
  late String _password;

  String get email => _email;
  String get password => _password;

  void setEmail(String email) => _email = email;
  void setPassword(String password) => _password = password;

  Map<String, dynamic> toJson() {
    return {"email": _email, "password": _password};
  }
}
