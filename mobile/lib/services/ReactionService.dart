import "dart:convert";

import "package:http/http.dart" as http;
import "package:mobile/models/Reaction.dart";

class ReactionService {
  Future<List<Reaction>> findAllReactionsByPost(int postId) async {
    List<Reaction> reactions = [];
    try {
      http.Response response = await http
          .get(Uri.parse("http://localhost:3000/reactions/search/$postId"));

      if (response.statusCode == 200) {
        List<dynamic> jsonData = json.decode(response.body);

        for (Map<String, dynamic> json in jsonData) {
          print(json);
          reactions.add(Reaction.fromJson(json));
        }
      }
    } catch (err) {
      print(err);
    }
    return reactions;
  }
}
