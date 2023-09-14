import 'package:flutter/material.dart';
import 'package:mobile/pages/CreatePostPage.dart';

class PostCreate extends StatelessWidget {
  const PostCreate({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const CreatePostPage()),
        );
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 15),
        decoration: BoxDecoration(
          color: Colors.grey[700],
          borderRadius: BorderRadius.circular(15),
          boxShadow: [
            BoxShadow(
              color: Colors.black26,
              offset: Offset(0, 2),
              blurRadius: 4,
            ),
          ],
        ),
        child: const Row(
          children: [
            CircleAvatar(
              radius: 10,
              backgroundImage: NetworkImage(
                "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png",
              ),
            ),
            SizedBox(width: 10),
            Expanded(
              child: Text(
                "¿Qué estás pensando?",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Icon(
              Icons.edit,
              color: Colors.white,
            ),
          ],
        ),
      ),
    );
  }
}
