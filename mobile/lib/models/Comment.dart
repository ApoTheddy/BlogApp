class Comment {
  late int userId;
  late int postId;

  late String content;
  late String? username;
  late String? profileImage;

  Comment({required this.content, this.username, this.profileImage});

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
        content: json["content"],
        username: json["user"]["username"],
        profileImage: json["user"]["profile_image"]);
  }

  Map<String, dynamic> toJson() {
    return {
      "author_id": userId,
      "post_id": postId,
      "content": content,
    };
  }
}
