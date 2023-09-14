import 'package:flutter/material.dart';

import 'package:mobile/models/Reaction.dart';
import 'package:mobile/services/ReactionService.dart';
import 'package:scrollable_positioned_list/scrollable_positioned_list.dart';

import 'package:mobile/models/Comment.dart';
import 'package:mobile/models/Post.dart';
import 'package:mobile/models/User.dart';
import 'package:mobile/pages/HomePage.dart';
import 'package:mobile/pages/ShowProfileUser.dart';
import 'package:mobile/services/CommentService.dart';
import 'package:intl/intl.dart';
import 'package:mobile/services/UserService.dart';

class PostCard extends StatefulWidget {
  const PostCard({Key? key, required this.post}) : super(key: key);
  final Post post;

  @override
  State<PostCard> createState() => _PostCardState();
}

class _PostCardState extends State<PostCard> {
  final commentService = CommentService();
  final userService = UserService();
  final reactionService = ReactionService();

  late Future<User?> _userFuture;
  final TextEditingController _commentContent = TextEditingController();
  final ItemScrollController _itemScrollController = ItemScrollController();
  bool isFavorite = false;
  bool _showComments = false;
  List<Reaction> reactions = [];

  @override
  void initState() {
    super.initState();
    _loadReactions();
    _userFuture = userService.findById(widget.post.authorId);
  }

  _loadReactions() async {
    reactions =
        await reactionService.findAllReactionsByPost(widget.post.postId);

    for (Reaction reaction in reactions) {
      // if (reaction.userId == widget.post.authorId) {
      //   setState(() {
      //     isFavorite = true;
      //   });
      // }
    }
  }

  void _scrollToLastComment() {
    _itemScrollController.scrollTo(
      index: widget.post.comments.length,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  void _scrollToFirstComment() {
    _itemScrollController.scrollTo(
      index: 0,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.all(15),
      decoration: BoxDecoration(
        color: const Color(0xFF333333),
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildUserInfo(),
              Text("REACTIONS: ${reactions.length}")
            ],
          ),
          const SizedBox(height: 15),
          Text(
            widget.post.content,
            style: const TextStyle(color: Colors.white, fontSize: 16),
          ),
          const SizedBox(height: 15),
          if (widget.post.typePublication == "text-image") _buildImage(),
          const SizedBox(height: 15),
          Row(
            children: [
              Icon(isFavorite ? Icons.favorite : Icons.favorite_border,
                  color: isFavorite ? Colors.redAccent : Colors.white),
              const SizedBox(width: 15),
              _buildCommentInfo(),
            ],
          ),
          if (_showComments) _buildCommentSection(),
          if (_showComments) _buildCommentInput(),
        ],
      ),
    );
  }

  Widget _buildUserInfo() {
    return InkWell(
      onTap: () => _navigateToProfilePage(),
      child: FutureBuilder<User?>(
        future: _userFuture,
        builder: (_, AsyncSnapshot<User?> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const SizedBox(
              width: 20,
              height: 20,
              child: CircularProgressIndicator(),
            );
          } else if (snapshot.hasError || !snapshot.hasData) {
            return const Text(
              "Usuario no encontrado",
              style: TextStyle(color: Colors.grey),
            );
          }
          User? currentUser = snapshot.data;
          Map<String, dynamic> level = _getTypeLevel(currentUser!.createdAt);
          return Row(
            children: [
              _buildUserAvatar(),
              _buildUserInfoColumn(currentUser, level),
            ],
          );
        },
      ),
    );
  }

  Widget _buildUserAvatar() {
    return Container(
      margin: const EdgeInsets.only(right: 10),
      height: 50,
      width: 50,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        image: DecorationImage(
          image: NetworkImage(
            widget.post.profileImage ??
                "https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg",
          ),
          fit: BoxFit.cover,
        ),
      ),
    );
  }

  Widget _buildUserInfoColumn(User currentUser, Map<String, dynamic> level) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.post.author,
          style: const TextStyle(color: Colors.white, fontSize: 16),
        ),
        Row(
          children: [
            Text(
              "${widget.post.authorCareer!} - ",
              style: const TextStyle(
                color: Colors.white54,
                fontSize: 12,
              ),
            ),
            Text(
              level["type"],
              style: TextStyle(color: level["color"], fontSize: 12),
            ),
          ],
        ),
      ],
    );
  }

  Map<String, dynamic> _getTypeLevel(String createdAt) {
    DateTime createdDateTime =
        DateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS").parse(createdAt);
    int months =
        (DateTime.now().difference(createdDateTime).inDays / 30).abs().toInt();
    Map<String, dynamic> level = {};
    if (months <= 12 && months >= 0) {
      level = {"type": "JUNIOR", "color": Colors.orange};
    } else if (months > 12 && months < 12 * 2) {
      level = {"type": "SEMI SENIOR", "color": Colors.yellow};
    } else {
      level = {"type": "SENIOR", "color": Colors.green};
    }
    return level;
  }

  Widget _buildImage() {
    return GestureDetector(
        onDoubleTap: () {
          setState(() => isFavorite = !isFavorite);
        },
        child: Container(
          height: 250,
          decoration: BoxDecoration(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(10),
            image: DecorationImage(
              fit: BoxFit.cover,
              image: NetworkImage(widget.post.image!),
            ),
          ),
        ));
  }

  Widget _buildCommentInfo() {
    return GestureDetector(
      onTap: () {
        setState(() {
          _showComments = !_showComments;
          if (_showComments) {
            Future.delayed(const Duration(milliseconds: 100)).then((value) {
              if (widget.post.comments.isNotEmpty) {
                _scrollToLastComment();
              }
            });
          }
        });
      },
      child: Row(
        children: [
          const Icon(
            Icons.comment_outlined,
            color: Colors.white,
          ),
          const SizedBox(width: 5),
          Text(
            "${widget.post.totalComments} Comments",
            style: const TextStyle(color: Colors.white),
          ),
        ],
      ),
    );
  }

  Widget _buildCommentSection() {
    if (widget.post.comments.isNotEmpty) {
      return SizedBox(
        height: 300,
        child: ScrollablePositionedList.builder(
            itemCount: widget.post.comments.length,
            itemScrollController: _itemScrollController,
            itemBuilder: (ctx, index) {
              Comment comment = widget
                  .post.comments[(widget.post.comments.length - 1) - index];

              return _buildComment(
                  comment.username!, comment.content, comment.profileImage!);
            }),
      );
    } else {
      return Container();
    }
  }

  Widget _buildCommentInput() {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: Colors.grey[700],
                borderRadius: BorderRadius.circular(20),
              ),
              child: TextFormField(
                controller: _commentContent,
                maxLines: null,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: "Comentar",
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(50),
                    borderSide: BorderSide(color: Colors.transparent),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(50),
                    borderSide: BorderSide(color: Colors.transparent),
                  ),
                  hintStyle: const TextStyle(color: Colors.grey),
                ),
              ),
            ),
          ),
          InkWell(
            onTap: () => _addComment(),
            child: Container(
              padding: const EdgeInsets.all(10),
              margin: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: Colors.blueAccent,
                shape: BoxShape.circle,
              ),
              child: Icon(Icons.send, color: Colors.white, size: 25),
            ),
          ),
        ],
      ),
    );
  }

  void _navigateToProfilePage() {
    if (widget.post.authorId != user.userId) {
      userService.findById(widget.post.authorId).then((user) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => ShowProfileUser(user: user!)),
        );
      });
    }
  }

  void _addComment() async {
    String content = _commentContent.text.trim();
    if (content.isNotEmpty) {
      Comment comment = Comment(content: content);

      comment.postId = widget.post.postId;
      comment.userId = user.userId;
      comment = (await commentService.addComment(comment))!;
      _commentContent.text = "";
      setState(() {
        widget.post.comments.add(comment);
        widget.post.totalComments++;
      });

      if (widget.post.comments.length > 2) {
        _scrollToFirstComment();
      }
    }
  }

  Widget _buildComment(String username, String comment, String profileImage) {
    return Container(
      padding: const EdgeInsets.all(10),
      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.grey[800],
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 20,
            backgroundImage: NetworkImage(profileImage),
          ),
          const SizedBox(width: 10),
          Flexible(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  username,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  comment,
                  style: const TextStyle(color: Colors.white),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
