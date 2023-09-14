import 'dart:convert';

import 'package:mobile/models/Comment.dart';
import "package:http/http.dart" as http;

class CommentService {
  Future<Comment?> addComment(Comment comment) async {
    Comment? commentResponse;
    try {
      http.Response response = await http.post(
          Uri.parse("http://192.168.1.6:3000/comments"),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(comment.toJson()));

      Map<String, dynamic> dataJson = json.decode(response.body);
      if (response.statusCode == 201) {
        commentResponse = Comment.fromJson(dataJson);
      }
    } catch (err) {
      print(err);
    }
    return commentResponse;
  }

  Future<Map<String, dynamic>> getCommentsByPostId(int postId) async {
    List<Comment> comments = [];
    int totalComments = 0;
    try {
      http.Response response =
          await http.get(Uri.parse("http://192.168.1.6:3000/comments/$postId"));

      Map<String, dynamic> jsonData = json.decode(response.body);
      if (response.statusCode == 200) {
        totalComments = jsonData["total_comments"];
        for (Map<String, dynamic> comment in jsonData["comments"]) {
          comments.add(Comment.fromJson(comment));
        }
      }
    } catch (err) {
      print(err);
    }
    return {"total_comments": totalComments, "comments": comments};
  }
}
