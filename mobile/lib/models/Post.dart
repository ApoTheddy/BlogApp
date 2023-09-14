import 'package:mobile/models/Comment.dart';

class Post {
  int postId;
  int authorId;
  String content;
  String? image;
  String author;
  String? profileImage;
  String typePublication;
  List<Comment> comments = [];
  String? authorCareer;
  int totalComments;

  Post(
      {required this.authorId,
      required this.postId,
      required this.content,
      this.image,
      required this.author,
      required this.typePublication,
      this.profileImage,
      required this.comments,
      this.authorCareer,
      required this.totalComments});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
        authorId: json["user"]["user_id"],
        postId: json["post_id"],
        author: json["user"]["username"],
        content: json["content"],
        image: json["image"] ?? "",
        typePublication: json["type_publication"],
        profileImage: json["user"]["profile_image"],
        comments: [],
        authorCareer: json["user"]["career"],
        totalComments: 0);
  }

  factory Post.fromJsonByFind(Map<String, dynamic> json) {
    return Post(
        postId: json["post_id"],
        authorId: json["user"]["user_id"],
        author: json["user"]["username"],
        content: json["content"],
        image: json["image"] ?? "",
        typePublication: json["type_publication"],
        profileImage: json["user"]["profile_image"],
        comments: [],
        authorCareer: json["user"]["career"],
        totalComments: 0);
  }

  factory Post.fromJsonPostProfile(Map<String, dynamic> json) {
    return Post(
        postId: json["post_id"],
        authorId: 0,
        author: "",
        content: json["content"],
        image: json["image"] ?? "",
        typePublication: json["type_publication"],
        profileImage: "",
        comments: [],
        authorCareer: "",
        totalComments: 0);
  }
}
