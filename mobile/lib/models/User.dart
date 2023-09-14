import 'package:mobile/models/Post.dart';

class User {
  late int userId;
  late String firstname;
  late String lastname;
  late String email;
  late String username;
  late String birthday;
  late String university;
  late String career;
  late String token;
  late String createdAt;
  late String? profileImage;
  late List<Post> posts = [];

  User({
    required this.userId,
    required this.firstname,
    required this.lastname,
    required this.email,
    required this.username,
    required this.birthday,
    required this.university,
    required this.career,
    required this.createdAt,
    required this.profileImage,
    required this.token,
  });

  User.fromJson(Map<String, dynamic> json) {
    userId = json["user_id"];
    firstname = json["firstname"];
    lastname = json["lastname"];
    email = json["email"];
    username = json["username"];
    birthday = json["birthday"];
    university = json["university"];
    career = json["career"];
    createdAt = json["created_at"];
    profileImage = json["profile_image"];
  }

  factory User.fromJsonPreferences(Map<String, dynamic> json) {
    return User(
        userId: json["user_id"],
        firstname: json["firstname"],
        lastname: json["lastname"],
        email: json["email"],
        username: json["username"],
        birthday: json["birthday"],
        university: json["university"],
        career: json["career"],
        createdAt: json["createdAt"],
        profileImage: json["profile_image"],
        token: json["token"]);
  }

  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'firstname': firstname,
      "lastname": lastname,
      "email": email,
      "username": username,
      "birthday": birthday,
      "university": university,
      "career": career,
      "profile_image": profileImage,
      "token": token
    };
  }

  factory User.fake() {
    return User(
        userId: 0,
        birthday: "00/00/000",
        career: "test-career",
        email: "test@email.com",
        firstname: "test",
        lastname: "tester",
        createdAt: "none",
        token: "none",
        university: "university-test",
        profileImage:
            "https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg",
        username: "test-0");
  }
}
