class Reaction {
  int reactionId;
  String createdAt;
  int userId;

  Reaction(
      {required this.reactionId,
      required this.createdAt,
      required this.userId});

  factory Reaction.fromJson(Map<String, dynamic> json) {
    return Reaction(
        reactionId: json["reaction_id"],
        userId: json["user"]["user_id"],
        createdAt: json["created_at"]);
  }
}
