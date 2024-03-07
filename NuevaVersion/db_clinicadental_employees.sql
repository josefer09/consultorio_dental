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
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id_employee` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `licenseNumber` int NOT NULL,
  `age` int NOT NULL,
  `id_userRole` int NOT NULL,
  `id_userSpecialty` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `id_room` int DEFAULT NULL,
  PRIMARY KEY (`id_employee`),
  KEY `fk_id_rol_idx` (`id_userRole`),
  KEY `fk_id_especialidad_idx` (`id_userSpecialty`),
  KEY `fk_id_user_idx` (`id_user`),
  KEY `fk_id_room_idx` (`id_room`),
  CONSTRAINT `fk_id_room` FOREIGN KEY (`id_room`) REFERENCES `rooms` (`id_room`),
  CONSTRAINT `fk_id_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `fk_id_userRole` FOREIGN KEY (`id_userRole`) REFERENCES `userroles` (`id_userRole`),
  CONSTRAINT `fk_id_userSpecialty` FOREIGN KEY (`id_userSpecialty`) REFERENCES `userspecialtys` (`id_userSpecialty`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (32,'José Fernando Hernandez',432,22,2,4,13,NULL,NULL),(34,'Paula',423,21,1,5,14,NULL,NULL),(36,'Jacinto Lopez',324,432,2,2,18,NULL,NULL),(41,'Carlos Vl',231,37,2,2,26,NULL,NULL),(42,'Emily Rogers',235,25,2,1,34,NULL,NULL);
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
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
