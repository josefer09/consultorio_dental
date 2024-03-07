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
-- Table structure for table `notas_medicas`
--

DROP TABLE IF EXISTS `notas_medicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notas_medicas` (
  `id_nota` int NOT NULL AUTO_INCREMENT,
  `nota` varchar(200) NOT NULL,
  `id_procedimiento` int NOT NULL,
  `id_cita` int NOT NULL,
  `id_paciente` int NOT NULL,
  `id_empleado` int DEFAULT NULL,
  PRIMARY KEY (`id_nota`),
  UNIQUE KEY `id_paciente_UNIQUE` (`id_paciente`),
  UNIQUE KEY `id_cita_UNIQUE` (`id_cita`),
  KEY `id_paciente_idx` (`id_paciente`),
  KEY `id_cita_idx` (`id_cita`),
  KEY `fk_id_procedimientos_idx` (`id_procedimiento`),
  KEY `fk_id_empleado_idx` (`id_empleado`),
  CONSTRAINT `fk_id_cita` FOREIGN KEY (`id_cita`) REFERENCES `appointments` (`id_appointment`),
  CONSTRAINT `fk_id_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `employees` (`id_employee`),
  CONSTRAINT `fk_id_paciente` FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`id_paciente`),
  CONSTRAINT `fk_id_procedimientos` FOREIGN KEY (`id_procedimiento`) REFERENCES `procedimientos` (`id_procedimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notas_medicas`
--

LOCK TABLES `notas_medicas` WRITE;
/*!40000 ALTER TABLE `notas_medicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `notas_medicas` ENABLE KEYS */;
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
