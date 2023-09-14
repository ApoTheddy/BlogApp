import 'package:flutter/material.dart';
import 'package:mobile/components/PostCard.dart';
import 'package:mobile/models/Post.dart';
import 'package:mobile/models/User.dart';
import 'package:mobile/pages/CreatePostPage.dart';
import 'package:mobile/pages/ProfilePage.dart';
import 'package:mobile/services/PostsService.dart';
import 'package:mobile/services/UserService.dart';
import 'package:shared_preferences/shared_preferences.dart';

User user = User.fake();

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  PostsService postService = PostsService();
  UserService userService = UserService();
  final scrollController = ScrollController();

  List<Post> posts = [];
  late SharedPreferences prefs;
  bool isLoading = true;
  bool hasMore = true;

  @override
  void initState() {
    super.initState();
    loadUserInfo();
    loadPosts();
    scrollController.addListener(_loadMorePosts);
  }

  @override
  void dispose() {
    scrollController.dispose();
    super.dispose();
  }

  Future<void> loadPosts() async {
    posts = await postService.findAll();
    setState(() {});
  }

  _loadMorePosts() async {
    if (scrollController.offset >= scrollController.position.maxScrollExtent) {
      List<Post> newPosts = await postService.getMorePosts(posts.length);
      if (newPosts.length < 10) {
        hasMore = false;
      }
      setState(() => posts.addAll([...newPosts]));
    }
  }

  Future<void> loadUserInfo() async {
    prefs = await SharedPreferences.getInstance();
    int? userId = prefs.getInt("user_id");
    if (userId != null) {
      user = (await userService.findByIdProfile(userId))!;
      isLoading = false;
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff19191B),
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(60.0),
        child: Container(
          padding: const EdgeInsets.all(10),
          color: const Color(0xFF252426),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              InkWell(
                onTap: () => Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const CreatePostPage()),
                ),
                child: const Icon(Icons.add, color: Colors.white),
              ),
              Container(
                width: 40,
                height: 40,
                decoration: const BoxDecoration(shape: BoxShape.circle),
              ),
              const SizedBox(width: 8),
              const Text(
                'SocialApp',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: () async {
                await loadPosts();
              },
              child: ListView.builder(
                controller: scrollController,
                itemCount: posts.length + 1,
                itemBuilder: (context, index) {
                  if (index < posts.length) {
                    return PostCard(post: posts[index]);
                  } else {
                    return hasMore
                        ? const Padding(
                            padding: EdgeInsets.symmetric(vertical: 25),
                            child: Center(child: CircularProgressIndicator()),
                          )
                        : Container();
                  }
                },
              ),
            ),
      bottomNavigationBar: BottomAppBar(
        color: const Color(0xFF252426),
        shape: const CircularNotchedRectangle(),
        notchMargin: 8.0,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            IconButton(
              icon: const Icon(Icons.home_outlined),
              color: Colors.white,
              onPressed: () {},
            ),
            IconButton(
              icon: const Icon(Icons.person),
              color: Colors.white,
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => ProfilePage(user: user)),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
