import "dart:convert";

import "package:http/http.dart" as http;
import "package:mobile/models/Post.dart";
import "package:mobile/services/CommentService.dart";

class PostsService {
  final commentService = CommentService();

  Future<List<Post>> findAll() async {
    List<Post> posts = [];
    try {
      http.Response response =
          await http.get(Uri.parse("http://192.168.1.6:3000/posts"));

      List<dynamic> jsonData = json.decode(response.body);
      if (response.statusCode == 200) {
        for (Map<String, dynamic> data in jsonData) {
          Post post = Post.fromJson(data);
          Map<String, dynamic> request =
              await commentService.getCommentsByPostId(post.postId);
          post.comments = request["comments"];
          post.totalComments = request["total_comments"];
          posts.add(post);
        }
      }
    } catch (err) {
      print(err);
      posts = [];
    }
    return posts;
  }

  Future<List<Post>> findPostsByUserId(int userId) async {
    List<Post> posts = [];
    try {
      http.Response response = await http
          .get(Uri.parse("http://192.168.1.6:3000/posts/search/$userId"));

      List<dynamic> jsonData = json.decode(response.body);
      if (response.statusCode == 200) {
        for (Map<String, dynamic> data in jsonData) {
          Post post = Post.fromJsonPostProfile(data);
          posts.add(post);
        }
      }
    } catch (err) {
      print(err);
      posts = [];
    }
    return posts;
  }

  Future<List<Post>> getMorePosts(int skip) async {
    List<Post> posts = [];
    try {
      http.Response response = await http
          .get(Uri.parse("http://192.168.1.6:3000/posts/?skip=$skip"));

      List<dynamic> jsonData = json.decode(response.body);
      if (response.statusCode == 200) {
        for (Map<String, dynamic> data in jsonData) {
          Post post = Post.fromJsonByFind(data);
          Map<String, dynamic> request =
              await commentService.getCommentsByPostId(post.postId);
          post.comments = request["comments"];
          post.totalComments = request["total_comments"];
          posts.add(post);
        }
      }
    } catch (err) {
      print(err);
      posts = [];
    }
    return posts;
  }

  Future<String> deletePost(int postId) async {
    String message = "";
    try {
      http.Response response =
          await http.delete(Uri.parse("http://192.168.1.6:3000/posts/$postId"));
      if (response.statusCode == 200) {
        message = "Post eliminado correctamente";
      } else {
        message = json.decode(response.body)["message"];
      }
    } catch (err) {
      message = "El post no se pudo eliminar";
    }
    return message;
  }
}
