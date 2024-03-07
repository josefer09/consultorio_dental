-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: db_clinicadental
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `token` varchar(500) DEFAULT NULL,
  `userName` varchar(20) NOT NULL,
  `type` enum('Normal','Doctor','Admin') NOT NULL DEFAULT 'Normal',
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `correo_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'josefer.hernandez@hotmail.com','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxMywiZW1haWwiOiJqb3NlZmVyLmhlcm5hbmRlekBob3RtYWlsLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE3MDExNTAxNDUsImV4cCI6MTcwMTE1Mzc0NX0.fH3X8hOVKtwxnrrIepi64vz_w19G0GBqIIrwKJ5lm8w','Fernando','Normal'),(14,'admin@admin','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxNCwiZW1haWwiOiJhZG1pbkBhZG1pbiIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE3MDExNjUzNTUsImV4cCI6MTcwMTE2ODk1NX0.ghaBCuwG5afKYGqUrlFhQWa6DYO4HAJqRjrKqx1PYJw','Paula','Admin'),(18,'jacinto@jacinto.com','1234',NULL,'Jacinto','Doctor'),(26,'Felipe@das.com','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoyNiwiZW1haWwiOiJGZWxpcGVAZGFzLmNvbSIsInBhc3N3b3JkIjoiYWRtaW4iLCJpYXQiOjE3MDExNTI1MzgsImV4cCI6MTcwMTE1NjEzOH0.G3ZuqJm1pTIGMuq6BK0I9AywGdgh2BpmfkgC3-KVwiE','Felipe','Doctor'),(34,'Emily@doctor','1234',NULL,'Emily','Doctor');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-28  3:04:45
