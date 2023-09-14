import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class CreatePostPage extends StatefulWidget {
  const CreatePostPage({Key? key}) : super(key: key);

  @override
  State<CreatePostPage> createState() => _CreatePostPageState();
}

class _CreatePostPageState extends State<CreatePostPage> {
  bool isEmptyContent = true;
  String imageSelected = "";
  TextEditingController postContent = TextEditingController();

  Future<void> _openGallery() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      setState(() {
        imageSelected = pickedFile.path;
        isEmptyContent = false;
      });
    }
  }

  void _removeImage() {
    setState(() => imageSelected = "");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF252426), // Color de fondo oscuro
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        iconTheme: IconThemeData(color: Colors.white),
        title: const Text(
          "Crear Publicación",
          style: TextStyle(color: Colors.white),
        ),
        titleSpacing: 0,
        actions: [
          Container(
            alignment: Alignment.center,
            decoration: BoxDecoration(
                color: isEmptyContent ? Colors.grey : Colors.blueAccent,
                borderRadius: BorderRadius.circular(10)),
            padding: EdgeInsets.all(10),
            margin: EdgeInsets.all(10),
            child: InkWell(
              splashColor: Colors.transparent,
              onTap: isEmptyContent
                  ? null
                  : () {
                      print(imageSelected);
                    },
              child: Text(
                "Publicar",
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          )
        ],
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(
              children: [
                Container(
                  margin: EdgeInsets.symmetric(horizontal: 10),
                  height: 70,
                  width: 70,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    image: DecorationImage(
                      image: NetworkImage(
                        "https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_640.png",
                      ),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                SizedBox(width: 10),
                Text(
                  "ApoTheddy",
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              decoration: BoxDecoration(
                color: Color(0xFF1C1C1C), // Color de fondo oscuro
                borderRadius: BorderRadius.circular(10),
              ),
              child: imageSelected.isEmpty
                  ? _buildTextPostField()
                  : _buildImagePostField(),
            ),
            SizedBox(height: 20),
            InkWell(
              onTap: _openGallery,
              child: Container(
                padding: EdgeInsets.all(10),
                decoration: BoxDecoration(
                  border: Border(bottom: BorderSide(color: Colors.white)),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.image,
                      color: Colors.green,
                    ),
                    SizedBox(width: 10),
                    Text(
                      "Adjuntar Foto",
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextPostField() {
    return TextFormField(
      onChanged: (value) {
        setState(() => isEmptyContent = value.trim().isNotEmpty ? false : true);
      },
      controller: postContent,
      style: TextStyle(color: Colors.white),
      maxLines: 6,
      decoration: InputDecoration(
        border: InputBorder.none,
        hintStyle: TextStyle(color: Colors.grey),
        hintText: "¿Qué estás pensando?",
      ),
    );
  }

  Widget _buildImagePostField() {
    return Column(
      children: [
        SizedBox(
          height: 70,
          child: TextFormField(
            onChanged: (value) {
              setState(() => isEmptyContent = value.isNotEmpty ? false : true);
            },
            controller: postContent,
            style: TextStyle(color: Colors.white),
            maxLines: 3,
            decoration: InputDecoration(
              border: InputBorder.none,
              hintStyle: TextStyle(color: Colors.grey),
              hintText: "Haz un comentario sobre esta imagen",
            ),
          ),
        ),
        SizedBox(height: 10),
        Stack(
          alignment: Alignment.topRight,
          children: [
            Container(
              height: 320,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                image: DecorationImage(
                  image: FileImage(File(imageSelected)),
                ),
              ),
            ),
            InkWell(
              onTap: _removeImage,
              child: Container(
                margin: EdgeInsets.all(10),
                padding: EdgeInsets.all(5),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.black45,
                ),
                child: Icon(
                  Icons.close,
                  color: Colors.white,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
