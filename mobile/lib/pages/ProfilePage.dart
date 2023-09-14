import 'package:flutter/material.dart';
import 'package:mobile/models/Post.dart';
import 'package:mobile/models/User.dart';
import 'package:intl/intl.dart';
import 'package:mobile/pages/LoginPage.dart';
import 'package:mobile/services/PostsService.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key, required this.user});

  final User user;

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final DateFormat originalFormat = DateFormat("dd/MM/yyyy");
  final DateFormat desiredFormat = DateFormat("MMMM d yyyy");
  final scrollController = ScrollController();
  List<Post> posts = [];
  bool hasMorePost = true;
  bool isLoading = true;

  final postService = PostsService();

  @override
  void initState() {
    super.initState();
    loadPrimaryPosts();
    scrollController.addListener(loadMorePosts);
  }

  @override
  void dispose() {
    scrollController.dispose();
    super.dispose();
  }

  void loadPrimaryPosts() async {
    posts = await postService.findPostsByUserId(widget.user.userId);
    setState(() {
      isLoading = false;
    });
  }

  void loadMorePosts() async {
    if (scrollController.offset >= scrollController.position.maxScrollExtent) {
      List<Post> newPosts = await postService.getMorePosts(posts.length);
      if (newPosts.length < 10) hasMorePost = false;
      setState(() => posts.addAll([...newPosts]));
    }
  }

  @override
  Widget build(BuildContext context) {
    DateTime parsedDate = originalFormat.parse(widget.user.birthday);
    String formattedDate = desiredFormat.format(parsedDate);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            onPressed: () => _logOut(),
            icon: Icon(
              Icons.exit_to_app,
              color: Colors.white,
            ),
          ),
        ],
      ),
      backgroundColor: Colors.black,
      body: SafeArea(
        child: SingleChildScrollView(
          controller: scrollController,
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Stack(
                children: [
                  CircleAvatar(
                    radius: 60,
                    backgroundImage: NetworkImage(
                      widget.user.profileImage ??
                          "https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg",
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: InkWell(
                      onTap: () {},
                      child: Container(
                        padding: const EdgeInsets.all(5),
                        decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          color: Colors.white,
                        ),
                        child: Icon(
                          Icons.camera_alt,
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16),
              Text(
                '${widget.user.username}',
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
              SizedBox(height: 24),
              _buildInfoRow(Icons.person,
                  '${widget.user.firstname} ${widget.user.lastname}'),
              _buildInfoRow(Icons.email, widget.user.email),
              _buildInfoRow(Icons.cake, formattedDate),
              _buildInfoRow(Icons.school, widget.user.university),
              _buildInfoRow(Icons.work, widget.user.career),
              SizedBox(height: 32),
              _buildSectionTitle('Publicaciones'),
              _buildUserPosts(),
              SizedBox(height: 16),
            ],
          ),
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
              fontSize: 16,
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
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Widget _buildUserPosts() {
    if (isLoading) {
      return const Center(child: CircularProgressIndicator());
    } else {
      return GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 8,
          mainAxisSpacing: 8,
        ),
        itemCount: posts.length,
        itemBuilder: (BuildContext context, int index) {
          if (posts[index].image == "") {
            return Column(
              mainAxisSize: MainAxisSize.max,
              children: [
                Expanded(
                    child: Container(
                  decoration: BoxDecoration(
                    color: Colors.grey,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Center(
                      child: Text(posts[index].content,
                          style: const TextStyle(color: Colors.white))),
                )),
                const SizedBox(height: 5),
                ElevatedButton(
                  onPressed: () => _deletePost(posts[index].postId),
                  style: ElevatedButton.styleFrom(
                    primary: Colors.red,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                  ),
                  child: Text(
                    "Eliminar",
                    style: TextStyle(fontSize: 14),
                  ),
                ),
              ],
            );
          }

          final imageUrl = posts[index].image ??
              "https://cdn.vectorstock.com/i/preview-1x/32/12/default-avatar-profile-icon-vector-39013212.jpg";

          return Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: Image.network(imageUrl, fit: BoxFit.cover),
                ),
              ),
              const SizedBox(height: 5),
              ElevatedButton(
                onPressed: () => _deletePost(posts[index].postId),
                style: ElevatedButton.styleFrom(
                  primary: Colors.red,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  padding: EdgeInsets.symmetric(horizontal: 12),
                ),
                child: Text(
                  "Eliminar",
                  style: TextStyle(fontSize: 14),
                ),
              ),
            ],
          );
        },
      );
    }
  }

  void _deletePost(int postId) {
    postService.deletePost(postId).then((message) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(message), duration: const Duration(seconds: 1)));
      setState(() => posts.removeWhere((element) => element.postId == postId));
    });
  }

  void _logOut() {
    SharedPreferences.getInstance().then((prefs) {
      prefs.clear();
      Navigator.push(
          context, MaterialPageRoute(builder: (_) => const LoginPage()));
    });
  }
}
