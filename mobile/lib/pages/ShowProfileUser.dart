import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile/models/Post.dart';
import 'package:mobile/models/User.dart';
import 'package:mobile/services/PostsService.dart';

class ShowProfileUser extends StatefulWidget {
  const ShowProfileUser({Key? key, required this.user}) : super(key: key);
  final User user;

  @override
  State<ShowProfileUser> createState() => _ShowProfileUserState();
}

class _ShowProfileUserState extends State<ShowProfileUser> {
  final postService = PostsService();
  final DateFormat originalFormat = DateFormat("dd/MM/yyyy");
  final DateFormat desiredFormat = DateFormat("MMMM d yyyy");

  @override
  Widget build(BuildContext context) {
    DateTime parsedDate = originalFormat.parse(widget.user.birthday);
    String formattedDate = desiredFormat.format(parsedDate);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
      ),
      backgroundColor: Color(0xFF19191B),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(height: 32),
            Center(
              child: CircleAvatar(
                radius: 60,
                backgroundImage: NetworkImage(
                  widget.user.profileImage ??
                      "https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg",
                ),
              ),
            ),
            SizedBox(height: 16),
            Center(
              child: Text(
                '${widget.user.username}',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 24),
            _buildInfoRow(Icons.person,
                '${widget.user.firstname} ${widget.user.lastname}'),
            _buildInfoRow(Icons.cake, formattedDate),
            _buildInfoRow(Icons.school, widget.user.university),
            _buildInfoRow(Icons.work, widget.user.career),
            const SizedBox(height: 32),
            _buildSectionTitle('Publicaciones'),
            Expanded(
              child: _buildUserPosts(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          Icon(
            icon,
            color: Colors.grey,
            size: 20,
          ),
          SizedBox(width: 12),
          Text(
            text,
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8.0),
      child: Text(
        title,
        style: TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildUserPosts() {
    return FutureBuilder<List<Post>>(
      future: postService.findPostsByUserId(widget.user.userId),
      builder: (context, AsyncSnapshot<List<Post>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return const Center(
              child: Text("Ocurrió un error al cargar las publicaciones"));
        }
        List<Post> posts = snapshot.data!;
        return GridView.builder(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
            crossAxisSpacing: 8,
            mainAxisSpacing: 8,
          ),
          itemCount: posts.length,
          itemBuilder: (BuildContext context, int index) {
            if (posts[index].image != "") {
              final imageUrl = posts[index].image!;
              return ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.network(imageUrl, fit: BoxFit.cover),
              );
            } else {
              return Container(
                decoration: BoxDecoration(
                  color: Colors.grey,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Center(child: Text(posts[index].content)),
              );
            }
          },
        );
      },
    );
  }
}
