-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: DASS_Project
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `COURSES`
--

DROP TABLE IF EXISTS `COURSES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COURSES` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSES`
--

LOCK TABLES `COURSES` WRITE;
/*!40000 ALTER TABLE `COURSES` DISABLE KEYS */;
INSERT INTO `COURSES` VALUES (1,'Mathematics'),(2,'Physics'),(3,'Biology'),(4,'Chemistry'),(5,'Literature');
/*!40000 ALTER TABLE `COURSES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COURSE_MODULE_LINK`
--

DROP TABLE IF EXISTS `COURSE_MODULE_LINK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COURSE_MODULE_LINK` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `course_ID` int DEFAULT NULL,
  `module_ID` int DEFAULT NULL,
  `module_number` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `course_ID` (`course_ID`,`module_ID`),
  KEY `module_ID` (`module_ID`),
  CONSTRAINT `COURSE_MODULE_LINK_ibfk_1` FOREIGN KEY (`course_ID`) REFERENCES `COURSES` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `COURSE_MODULE_LINK_ibfk_2` FOREIGN KEY (`module_ID`) REFERENCES `MODULES` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COURSE_MODULE_LINK`
--

LOCK TABLES `COURSE_MODULE_LINK` WRITE;
/*!40000 ALTER TABLE `COURSE_MODULE_LINK` DISABLE KEYS */;
INSERT INTO `COURSE_MODULE_LINK` VALUES (16,1,1,1),(17,1,2,2),(18,1,3,3),(19,2,4,1),(20,2,5,2),(21,2,6,3),(22,3,7,1),(23,3,8,2),(24,3,9,3),(25,4,10,1),(26,4,11,2),(27,4,12,3),(28,5,13,1),(29,5,14,2),(30,5,15,3);
/*!40000 ALTER TABLE `COURSE_MODULE_LINK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EXAM_TEMPLATES`
--

DROP TABLE IF EXISTS `EXAM_TEMPLATES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EXAM_TEMPLATES` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `parent_type` varchar(100) DEFAULT NULL,
  `parent_ID` int DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `pass_percentage` float DEFAULT NULL,
  `group_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `parent_ID` (`parent_ID`),
  CONSTRAINT `EXAM_TEMPLATES_ibfk_1` FOREIGN KEY (`parent_ID`) REFERENCES `COURSES` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EXAM_TEMPLATES`
--

LOCK TABLES `EXAM_TEMPLATES` WRITE;
/*!40000 ALTER TABLE `EXAM_TEMPLATES` DISABLE KEYS */;
INSERT INTO `EXAM_TEMPLATES` VALUES (1,'Course',1,'Initial Assesment',78,'Module'),(2,'Module',1,'Practice 1',85,'Subskill'),(3,'Module',1,'Practice 2',80,'Subskill'),(4,'Module',1,'Practice 3',75,'Subskill'),(5,'Module',1,'Practice 4',50,'Subskill'),(6,'Module',1,'Practice 5',0,'Subskill'),(7,'Course',2,'Initial Assesment',78,'Module');
/*!40000 ALTER TABLE `EXAM_TEMPLATES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EXAM_TEMPLATES_INFO`
--

DROP TABLE IF EXISTS `EXAM_TEMPLATES_INFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EXAM_TEMPLATES_INFO` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Template_ID` int DEFAULT NULL,
  `section_Name` varchar(100) DEFAULT NULL,
  `Allowed_Question_Types` text,
  `min_time` int DEFAULT NULL,
  `max_time` int DEFAULT NULL,
  `pass_percentage` float DEFAULT NULL,
  `allowed_levels` varchar(100) DEFAULT NULL,
  `level_distribution` json DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Template_ID` (`Template_ID`),
  CONSTRAINT `EXAM_TEMPLATES_INFO_ibfk_1` FOREIGN KEY (`Template_ID`) REFERENCES `EXAM_TEMPLATES` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EXAM_TEMPLATES_INFO`
--

LOCK TABLES `EXAM_TEMPLATES_INFO` WRITE;
/*!40000 ALTER TABLE `EXAM_TEMPLATES_INFO` DISABLE KEYS */;
INSERT INTO `EXAM_TEMPLATES_INFO` VALUES (1,1,'Section 1','MCQ',30,50,75,'1,3','{\"1\": 50, \"3\": 50}'),(2,2,'Section 1','MCQ',15,40,85,'1','{\"1\": 100}'),(4,3,'Section 1','MCQ',15,30,75,'2','{\"2\": 100}'),(6,4,'Section 1','MCQ',15,30,75,'3','{\"3\": 100}'),(8,7,'Section 1','MCQ',30,50,75,'1,3','{\"1\": 50, \"3\": 50}');
/*!40000 ALTER TABLE `EXAM_TEMPLATES_INFO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EXERCISES`
--

DROP TABLE IF EXISTS `EXERCISES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EXERCISES` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ex_type` varchar(100) DEFAULT NULL,
  `ex_time` int DEFAULT NULL,
  `ex_category` int DEFAULT NULL,
  `ex_sub_category` int DEFAULT NULL,
  `ex_level` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=208 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EXERCISES`
--

LOCK TABLES `EXERCISES` WRITE;
/*!40000 ALTER TABLE `EXERCISES` DISABLE KEYS */;
INSERT INTO `EXERCISES` VALUES (1,'MCQ',12,NULL,NULL,1),(2,'MCQ',8,NULL,NULL,2),(3,'MCQ',15,NULL,NULL,3),(4,'MCQ',5,NULL,NULL,4),(5,'MCQ',19,NULL,NULL,1),(6,'MCQ',11,NULL,NULL,2),(7,'MCQ',7,NULL,NULL,3),(8,'MCQ',18,NULL,NULL,4),(9,'MCQ',10,NULL,NULL,1),(10,'MCQ',14,NULL,NULL,2),(11,'MCQ',6,NULL,NULL,3),(12,'MCQ',17,NULL,NULL,4),(13,'MCQ',4,NULL,NULL,1),(14,'MCQ',13,NULL,NULL,2),(15,'MCQ',9,NULL,NULL,3),(16,'MCQ',16,NULL,NULL,4),(17,'MCQ',3,NULL,NULL,1),(18,'MCQ',20,NULL,NULL,2),(19,'MCQ',7,NULL,NULL,3),(20,'MCQ',5,NULL,NULL,4),(21,'MCQ',9,NULL,NULL,1),(22,'MCQ',4,NULL,NULL,2),(23,'MCQ',6,NULL,NULL,3),(24,'MCQ',8,NULL,NULL,4),(25,'MCQ',3,NULL,NULL,1),(26,'MCQ',10,NULL,NULL,2),(27,'MCQ',2,NULL,NULL,3),(28,'MCQ',18,NULL,NULL,4),(29,'MCQ',8,NULL,NULL,1),(30,'MCQ',15,NULL,NULL,2),(31,'MCQ',5,NULL,NULL,3),(32,'MCQ',19,NULL,NULL,4),(33,'MCQ',11,NULL,NULL,1),(34,'MCQ',7,NULL,NULL,2),(35,'MCQ',18,NULL,NULL,3),(36,'MCQ',10,NULL,NULL,4),(37,'MCQ',14,NULL,NULL,1),(38,'MCQ',6,NULL,NULL,2),(39,'MCQ',17,NULL,NULL,3),(40,'MCQ',4,NULL,NULL,4),(41,'MCQ',13,NULL,NULL,1),(42,'MCQ',9,NULL,NULL,2),(43,'MCQ',16,NULL,NULL,3),(44,'MCQ',3,NULL,NULL,4),(45,'MCQ',20,NULL,NULL,1),(46,'MCQ',21,NULL,NULL,2),(47,'MCQ',7,NULL,NULL,3),(48,'MCQ',5,NULL,NULL,4),(49,'MCQ',9,NULL,NULL,1),(50,'MCQ',4,NULL,NULL,2),(51,'MCQ',6,NULL,NULL,3),(52,'MCQ',8,NULL,NULL,4),(53,'MCQ',3,NULL,NULL,1),(54,'MCQ',10,NULL,NULL,2),(55,'MCQ',18,NULL,NULL,3),(56,'MCQ',8,NULL,NULL,4),(57,'MCQ',15,NULL,NULL,1),(58,'MCQ',5,NULL,NULL,2),(59,'MCQ',19,NULL,NULL,3),(60,'MCQ',11,NULL,NULL,4),(61,'MCQ',7,NULL,NULL,1),(62,'MCQ',18,NULL,NULL,2),(63,'MCQ',10,NULL,NULL,3),(64,'MCQ',14,NULL,NULL,4),(65,'MCQ',6,NULL,NULL,1),(66,'MCQ',17,NULL,NULL,2),(67,'MCQ',4,NULL,NULL,3),(68,'MCQ',13,NULL,NULL,4),(69,'MCQ',9,NULL,NULL,1),(70,'MCQ',16,NULL,NULL,2),(71,'MCQ',3,NULL,NULL,3),(72,'MCQ',20,NULL,NULL,4),(73,'MCQ',12,NULL,NULL,1),(74,'MCQ',8,NULL,NULL,2),(75,'MCQ',15,NULL,NULL,3),(76,'MCQ',5,NULL,NULL,4),(77,'MCQ',19,NULL,NULL,1),(78,'MCQ',11,NULL,NULL,2),(79,'MCQ',7,NULL,NULL,3),(80,'MCQ',18,NULL,NULL,4),(81,'MCQ',10,NULL,NULL,1),(82,'MCQ',14,NULL,NULL,2),(83,'MCQ',6,NULL,NULL,3),(84,'MCQ',17,NULL,NULL,4),(85,'MCQ',4,NULL,NULL,1),(86,'MCQ',13,NULL,NULL,2),(87,'MCQ',9,NULL,NULL,3),(88,'MCQ',16,NULL,NULL,4),(89,'MCQ',3,NULL,NULL,1),(90,'MCQ',20,NULL,NULL,2),(91,'MCQ',7,NULL,NULL,3),(92,'MCQ',5,NULL,NULL,4),(93,'MCQ',9,NULL,NULL,1),(94,'MCQ',4,NULL,NULL,2),(95,'MCQ',6,NULL,NULL,3),(96,'MCQ',8,NULL,NULL,4),(97,'MCQ',3,NULL,NULL,1),(98,'MCQ',10,NULL,NULL,2),(99,'MCQ',2,NULL,NULL,3),(100,'MCQ',18,NULL,NULL,4),(101,'MCQ',8,NULL,NULL,1),(102,'MCQ',15,NULL,NULL,2),(103,'MCQ',5,NULL,NULL,3),(104,'MCQ',19,NULL,NULL,4),(105,'MCQ',11,NULL,NULL,1),(106,'MCQ',7,NULL,NULL,2),(107,'MCQ',18,NULL,NULL,3),(108,'MCQ',10,NULL,NULL,4),(109,'MCQ',14,NULL,NULL,1),(110,'MCQ',6,NULL,NULL,2),(111,'MCQ',17,NULL,NULL,3),(112,'MCQ',4,NULL,NULL,4),(113,'MCQ',13,NULL,NULL,1),(114,'MCQ',9,NULL,NULL,2),(115,'MCQ',16,NULL,NULL,3),(116,'MCQ',3,NULL,NULL,4),(117,'MCQ',20,NULL,NULL,1),(118,'MCQ',21,NULL,NULL,2),(119,'MCQ',7,NULL,NULL,3),(120,'MCQ',5,NULL,NULL,4),(121,'MCQ',9,NULL,NULL,1),(122,'MCQ',4,NULL,NULL,2),(123,'MCQ',6,NULL,NULL,3),(124,'MCQ',8,NULL,NULL,4),(125,'MCQ',3,NULL,NULL,1),(126,'MCQ',10,NULL,NULL,2),(127,'MCQ',18,NULL,NULL,3),(128,'MCQ',8,NULL,NULL,4),(129,'MCQ',15,NULL,NULL,1),(130,'MCQ',5,NULL,NULL,2),(131,'MCQ',19,NULL,NULL,3),(132,'MCQ',11,NULL,NULL,4),(133,'MCQ',7,NULL,NULL,1),(134,'MCQ',18,NULL,NULL,2),(135,'MCQ',10,NULL,NULL,3),(136,'MCQ',14,NULL,NULL,4),(137,'MCQ',6,NULL,NULL,1),(138,'MCQ',17,NULL,NULL,2),(139,'MCQ',4,NULL,NULL,3),(140,'MCQ',13,NULL,NULL,4),(141,'MCQ',9,NULL,NULL,1),(142,'MCQ',16,NULL,NULL,2),(143,'MCQ',3,NULL,NULL,3),(144,'MCQ',20,NULL,NULL,4),(145,'MCQ',12,NULL,NULL,1),(146,'MCQ',8,NULL,NULL,2),(147,'MCQ',15,NULL,NULL,3),(148,'MCQ',5,NULL,NULL,4),(149,'MCQ',19,NULL,NULL,1),(150,'MCQ',11,NULL,NULL,2),(151,'MCQ',7,NULL,NULL,3),(152,'MCQ',18,NULL,NULL,4),(153,'MCQ',10,NULL,NULL,1),(154,'MCQ',14,NULL,NULL,2),(155,'MCQ',6,NULL,NULL,3),(156,'MCQ',17,NULL,NULL,4),(157,'MCQ',4,NULL,NULL,1),(158,'MCQ',13,NULL,NULL,2),(159,'MCQ',9,NULL,NULL,3),(160,'MCQ',16,NULL,NULL,4),(161,'MCQ',3,NULL,NULL,1),(162,'MCQ',20,NULL,NULL,2),(163,'MCQ',7,NULL,NULL,3),(164,'MCQ',5,NULL,NULL,4),(165,'MCQ',9,NULL,NULL,1),(166,'MCQ',4,NULL,NULL,2),(167,'MCQ',6,NULL,NULL,3),(168,'MCQ',8,NULL,NULL,4),(169,'MCQ',3,NULL,NULL,1),(170,'MCQ',10,NULL,NULL,2),(171,'MCQ',2,NULL,NULL,3),(172,'MCQ',18,NULL,NULL,4),(173,'MCQ',8,NULL,NULL,1),(174,'MCQ',15,NULL,NULL,2),(175,'MCQ',5,NULL,NULL,3),(176,'MCQ',19,NULL,NULL,4),(177,'MCQ',11,NULL,NULL,1),(178,'MCQ',7,NULL,NULL,2),(179,'MCQ',18,NULL,NULL,3),(180,'MCQ',10,NULL,NULL,4),(181,'Integer',15,NULL,NULL,2),(182,'Integer',7,NULL,NULL,4),(183,'Integer',20,NULL,NULL,2),(184,'Integer',10,NULL,NULL,4),(185,'Integer',18,NULL,NULL,2),(186,'Integer',9,NULL,NULL,4),(187,'Integer',17,NULL,NULL,2),(188,'Integer',8,NULL,NULL,4),(189,'Integer',22,NULL,NULL,2),(190,'Integer',12,NULL,NULL,4),(191,'Integer',25,NULL,NULL,2),(192,'Integer',14,NULL,NULL,4),(193,'Integer',30,NULL,NULL,2),(194,'Integer',16,NULL,NULL,4),(195,'Integer',35,NULL,NULL,2),(196,'Integer',18,NULL,NULL,4),(197,'Integer',40,NULL,NULL,2),(198,'Integer',20,NULL,NULL,4),(199,'True/False',6,NULL,NULL,NULL),(200,'True/False',5,NULL,NULL,NULL),(201,'True/False',8,NULL,NULL,NULL),(202,'True/False',10,NULL,NULL,NULL),(203,'Fill In The Blanks',8,NULL,NULL,NULL),(204,'Fill In The Blanks',10,NULL,NULL,NULL),(205,'Fill In The Blanks',11,NULL,NULL,NULL),(206,'Fill In The Blanks',13,NULL,NULL,NULL),(207,'Fill In The Blanks',15,NULL,NULL,NULL);
/*!40000 ALTER TABLE `EXERCISES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EXERCISE_DATA`
--

DROP TABLE IF EXISTS `EXERCISE_DATA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EXERCISE_DATA` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ex_ID` int DEFAULT NULL,
  `ex_key` text,
  `ex_value` text,
  PRIMARY KEY (`ID`),
  KEY `ex_ID` (`ex_ID`),
  CONSTRAINT `EXERCISE_DATA_ibfk_1` FOREIGN KEY (`ex_ID`) REFERENCES `EXERCISES` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EXERCISE_DATA`
--

LOCK TABLES `EXERCISE_DATA` WRITE;
/*!40000 ALTER TABLE `EXERCISE_DATA` DISABLE KEYS */;
/*!40000 ALTER TABLE `EXERCISE_DATA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EXERCISE_TAG_LINK`
--

DROP TABLE IF EXISTS `EXERCISE_TAG_LINK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EXERCISE_TAG_LINK` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ex_ID` int DEFAULT NULL,
  `tag_ID` int DEFAULT NULL,
  `tag_ref` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ex_ID` (`ex_ID`,`tag_ID`),
  KEY `tag_ID` (`tag_ID`),
  KEY `tag_ref` (`tag_ref`),
  CONSTRAINT `EXERCISE_TAG_LINK_ibfk_1` FOREIGN KEY (`ex_ID`) REFERENCES `EXERCISES` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `EXERCISE_TAG_LINK_ibfk_2` FOREIGN KEY (`tag_ID`) REFERENCES `TAGS` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `EXERCISE_TAG_LINK_ibfk_3` FOREIGN KEY (`tag_ref`) REFERENCES `TAG_VALUES` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=355 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EXERCISE_TAG_LINK`
--

LOCK TABLES `EXERCISE_TAG_LINK` WRITE;
/*!40000 ALTER TABLE `EXERCISE_TAG_LINK` DISABLE KEYS */;
INSERT INTO `EXERCISE_TAG_LINK` VALUES (181,1,4,30),(182,2,4,30),(183,3,4,30),(184,4,4,30),(185,5,4,30),(186,6,4,30),(187,7,4,30),(188,8,4,31),(189,9,4,31),(190,10,4,31),(191,11,4,31),(192,12,4,31),(193,13,4,31),(194,14,4,31),(195,15,4,32),(196,16,4,32),(197,17,4,32),(198,18,4,32),(199,19,4,32),(200,20,4,32),(201,21,4,33),(202,22,4,33),(203,23,4,33),(204,24,4,33),(205,25,4,33),(206,26,4,33),(207,27,4,33),(208,28,4,34),(209,29,4,34),(210,30,4,34),(211,31,4,34),(212,32,4,34),(213,33,4,34),(214,34,4,34),(215,35,4,35),(216,36,4,35),(217,37,4,35),(218,38,4,35),(219,39,4,35),(220,40,4,35),(221,41,4,36),(222,42,4,36),(223,43,4,36),(224,44,4,36),(225,45,4,36),(226,46,4,36),(227,47,4,36),(228,48,4,37),(229,49,4,37),(230,50,4,37),(231,51,4,37),(232,52,4,37),(233,53,4,37),(234,54,4,37),(235,55,4,38),(236,56,4,38),(237,57,4,38),(238,58,4,38),(239,59,4,38),(240,60,4,38),(241,61,4,39),(242,62,4,39),(243,63,4,39),(244,64,4,39),(245,65,4,39),(246,66,4,39),(247,67,4,39),(248,68,4,40),(249,69,4,40),(250,70,4,40),(251,71,4,40),(252,72,4,40),(253,73,4,40),(254,74,4,40),(255,75,4,41),(256,76,4,41),(257,77,4,41),(258,78,4,41),(259,79,4,41),(260,80,4,41),(261,81,4,42),(262,82,4,42),(263,83,4,42),(264,84,4,42),(265,85,4,42),(266,86,4,42),(267,87,4,42),(268,88,4,43),(269,89,4,43),(270,90,4,43),(271,91,4,43),(272,92,4,43),(273,93,4,43),(274,94,4,43),(275,95,4,45),(276,96,4,45),(277,97,4,45),(278,98,4,45),(279,99,4,45),(280,100,4,45),(281,101,4,46),(282,102,4,46),(283,103,4,46),(284,104,4,46),(285,105,4,46),(286,106,4,46),(287,107,4,46),(288,108,4,47),(289,109,4,47),(290,110,4,47),(291,111,4,47),(292,112,4,47),(293,113,4,47),(294,114,4,47),(295,115,4,48),(296,116,4,48),(297,117,4,48),(298,118,4,48),(299,119,4,48),(300,120,4,48),(301,121,4,49),(302,122,4,49),(303,123,4,49),(304,124,4,49),(305,125,4,49),(306,126,4,49),(307,127,4,49),(308,128,4,50),(309,129,4,50),(310,130,4,50),(311,131,4,50),(312,132,4,50),(313,133,4,50),(314,134,4,50),(315,135,4,51),(316,136,4,51),(317,137,4,51),(318,138,4,51),(319,139,4,51),(320,140,4,51),(321,141,4,52),(322,142,4,52),(323,143,4,52),(324,144,4,52),(325,145,4,52),(326,146,4,52),(327,147,4,52),(328,148,4,53),(329,149,4,53),(330,150,4,53),(331,151,4,53),(332,152,4,53),(333,153,4,53),(334,154,4,53),(335,155,4,54),(336,156,4,54),(337,157,4,54),(338,158,4,54),(339,159,4,54),(340,160,4,54),(341,161,4,55),(342,162,4,55),(343,163,4,55),(344,164,4,55),(345,165,4,55),(346,166,4,55),(347,167,4,55),(348,168,4,56),(349,169,4,56),(350,170,4,56),(351,171,4,56),(352,172,4,56),(353,173,4,56),(354,174,4,56);
/*!40000 ALTER TABLE `EXERCISE_TAG_LINK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MODULES`
--

DROP TABLE IF EXISTS `MODULES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MODULES` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `module_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MODULES`
--

LOCK TABLES `MODULES` WRITE;
/*!40000 ALTER TABLE `MODULES` DISABLE KEYS */;
INSERT INTO `MODULES` VALUES (1,'Mod 1 Math'),(2,'Mod 2 Math'),(3,'Mod 3 Math'),(4,'Mod 1 Physics'),(5,'Mod 2 Physics'),(6,'Mod 3 Physics'),(7,'Mod 1 Biology'),(8,'Mod 2 Biology'),(9,'Mod 3 Biology'),(10,'Mod 1 Chem'),(11,'Mod 2 Chem'),(12,'Mod 3 Chem'),(13,'Mod 1 Lit'),(14,'Mod 2 Lit'),(15,'Mod 3 Lit');
/*!40000 ALTER TABLE `MODULES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MODULE_SUBSKILL_LINK`
--

DROP TABLE IF EXISTS `MODULE_SUBSKILL_LINK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MODULE_SUBSKILL_LINK` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `module_ID` int DEFAULT NULL,
  `subskill_ID` int DEFAULT NULL,
  `subskill_number` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `module_ID` (`module_ID`,`subskill_ID`),
  KEY `subskill_ID` (`subskill_ID`),
  CONSTRAINT `MODULE_SUBSKILL_LINK_ibfk_1` FOREIGN KEY (`module_ID`) REFERENCES `MODULES` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `MODULE_SUBSKILL_LINK_ibfk_2` FOREIGN KEY (`subskill_ID`) REFERENCES `SUBSKILLS` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MODULE_SUBSKILL_LINK`
--

LOCK TABLES `MODULE_SUBSKILL_LINK` WRITE;
/*!40000 ALTER TABLE `MODULE_SUBSKILL_LINK` DISABLE KEYS */;
INSERT INTO `MODULE_SUBSKILL_LINK` VALUES (1,1,1,1),(2,1,2,2),(3,1,3,3),(4,2,4,1),(5,2,5,2),(6,2,6,3),(7,3,7,1),(8,3,8,2),(9,3,9,3);
/*!40000 ALTER TABLE `MODULE_SUBSKILL_LINK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SKILLTOPICS`
--

DROP TABLE IF EXISTS `SKILLTOPICS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SKILLTOPICS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `skilltopic_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SKILLTOPICS`
--

LOCK TABLES `SKILLTOPICS` WRITE;
/*!40000 ALTER TABLE `SKILLTOPICS` DISABLE KEYS */;
INSERT INTO `SKILLTOPICS` VALUES (1,'Solving Linear Equations'),(2,'Graphing Linear Equations'),(3,'Systems of Linear Equations'),(4,'Properties of Triangles'),(5,'Properties of Quadrilaterals'),(6,'Circle Theorems'),(7,'Trigonometric Identities'),(8,'Trigonometric Functions and Graphs'),(9,'Solving Trigonometric Equations'),(10,'Quadratic Functions and Equations'),(11,'Polynomial Functions'),(12,'Exponential and Logarithmic Functions'),(13,'Area and Perimeter of Polygons'),(14,'Volume and Surface Area of Solids'),(15,'Transformations and Symmetry'),(16,'Law of Sines and Cosines'),(17,'Vectors in the Plane'),(18,'Polar Coordinates'),(19,'Limits and Continuity'),(20,'Derivatives of Functions'),(21,'Applications of Differentiation'),(22,'Integration Techniques'),(23,'Applications of Integration'),(24,'Sequences and Series'),(25,'Parametric Equations and Polar Coordinates'),(26,'Vector-Valued Functions'),(27,'Partial Derivatives and Multiple Integrals');
/*!40000 ALTER TABLE `SKILLTOPICS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUBSKILLS`
--

DROP TABLE IF EXISTS `SUBSKILLS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SUBSKILLS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `subskill_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUBSKILLS`
--

LOCK TABLES `SUBSKILLS` WRITE;
/*!40000 ALTER TABLE `SUBSKILLS` DISABLE KEYS */;
INSERT INTO `SUBSKILLS` VALUES (1,'Algebra I'),(2,'Geometry I'),(3,'Trigonometry I'),(4,'Algebra II'),(5,'Geometry II'),(6,'Trigonometry II'),(7,'Calculus I'),(8,'Calculus II'),(9,'Calculus III');
/*!40000 ALTER TABLE `SUBSKILLS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SUBSKILL_SKILLTOPIC_LINK`
--

DROP TABLE IF EXISTS `SUBSKILL_SKILLTOPIC_LINK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SUBSKILL_SKILLTOPIC_LINK` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `subskill_ID` int DEFAULT NULL,
  `skilltopic_ID` int DEFAULT NULL,
  `skilltopic_number` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `subskill_ID` (`subskill_ID`,`skilltopic_ID`),
  KEY `skilltopic_ID` (`skilltopic_ID`),
  CONSTRAINT `SUBSKILL_SKILLTOPIC_LINK_ibfk_1` FOREIGN KEY (`subskill_ID`) REFERENCES `SUBSKILLS` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `SUBSKILL_SKILLTOPIC_LINK_ibfk_2` FOREIGN KEY (`skilltopic_ID`) REFERENCES `SKILLTOPICS` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SUBSKILL_SKILLTOPIC_LINK`
--

LOCK TABLES `SUBSKILL_SKILLTOPIC_LINK` WRITE;
/*!40000 ALTER TABLE `SUBSKILL_SKILLTOPIC_LINK` DISABLE KEYS */;
INSERT INTO `SUBSKILL_SKILLTOPIC_LINK` VALUES (1,1,1,1),(2,1,2,2),(3,1,3,3),(4,2,4,1),(5,2,5,2),(6,2,6,3),(7,3,7,1),(8,3,8,2),(9,3,9,3),(10,4,10,1),(11,4,11,2),(12,4,12,3),(13,5,13,1),(14,5,14,2),(15,5,15,3),(16,6,16,1),(17,6,17,2),(18,6,18,3),(19,7,19,1),(20,7,20,2),(21,7,21,3),(22,8,22,1),(23,8,23,2),(24,8,24,3),(25,9,25,1),(26,9,26,2),(27,9,27,3);
/*!40000 ALTER TABLE `SUBSKILL_SKILLTOPIC_LINK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TAGS`
--

DROP TABLE IF EXISTS `TAGS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TAGS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `tag_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TAGS`
--

LOCK TABLES `TAGS` WRITE;
/*!40000 ALTER TABLE `TAGS` DISABLE KEYS */;
INSERT INTO `TAGS` VALUES (1,'COURSE'),(2,'MODULE'),(3,'SUBSKILL'),(4,'SKILLTOPIC'),(5,'APPLICATION');
/*!40000 ALTER TABLE `TAGS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TAG_VALUES`
--

DROP TABLE IF EXISTS `TAG_VALUES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TAG_VALUES` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `tag_ID` int DEFAULT NULL,
  `tag_value` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `tag_ID` (`tag_ID`),
  CONSTRAINT `TAG_VALUES_ibfk_1` FOREIGN KEY (`tag_ID`) REFERENCES `TAGS` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TAG_VALUES`
--

LOCK TABLES `TAG_VALUES` WRITE;
/*!40000 ALTER TABLE `TAG_VALUES` DISABLE KEYS */;
INSERT INTO `TAG_VALUES` VALUES (1,1,'Mathematics'),(2,1,'Physics'),(3,1,'Biology'),(4,1,'Chemistry'),(5,1,'Literature'),(6,2,'Mod 1 Math'),(7,2,'Mod 2 Math'),(8,2,'Mod 3 Math'),(9,2,'Mod 1 Physics'),(10,2,'Mod 2 Physics'),(11,2,'Mod 3 Physics'),(12,2,'Mod 1 Biology'),(13,2,'Mod 2 Biology'),(14,2,'Mod 3 Biology'),(15,2,'Mod 1 Chem'),(16,2,'Mod 2 Chem'),(17,2,'Mod 3 Chem'),(18,2,'Mod 1 Lit'),(19,2,'Mod 2 Lit'),(20,2,'Mod 3 Lit'),(21,3,'Algebra I'),(22,3,'Geometry I'),(23,3,'Trigonometry I'),(24,3,'Algebra II'),(25,3,'Geometry II'),(26,3,'Trigonometry II'),(27,3,'Calculus I'),(28,3,'Calculus II'),(29,3,'Calculus III'),(30,4,'Solving Linear Equations'),(31,4,'Graphing Linear Equations'),(32,4,'Systems of Linear Equations'),(33,4,'Properties of Triangles'),(34,4,'Properties of Quadrilaterals'),(35,4,'Circle Theorems'),(36,4,'Trigonometric Identities'),(37,4,'Trigonometric Functions and Graphs'),(38,4,'Solving Trigonometric Equations'),(39,4,'Quadratic Functions and Equations'),(40,4,'Polynomial Functions'),(41,4,'Exponential and Logarithmic Functions'),(42,4,'Area and Perimeter of Polygons'),(43,4,'Volume and Surface Area of Solids'),(44,4,'Transformations and Symmetry'),(45,4,'Law of Sines and Cosines'),(46,4,'Vectors in the Plane'),(47,4,'Polar Coordinates'),(48,4,'Limits and Continuity'),(49,4,'Derivatives of Functions'),(50,4,'Applications of Differentiation'),(51,4,'Integration Techniques'),(52,4,'Applications of Integration'),(53,4,'Sequences and Series'),(54,4,'Parametric Equations and Polar Coordinates'),(55,4,'Vector-Valued Functions'),(56,4,'Partial Derivatives and Multiple Integrals');
/*!40000 ALTER TABLE `TAG_VALUES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS_PROGRESS`
--

DROP TABLE IF EXISTS `USERS_PROGRESS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS_PROGRESS` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `User_Id` int DEFAULT NULL,
  `Current_Course_ID` int DEFAULT NULL,
  `Current_Module_ID` int DEFAULT NULL,
  `Current_Subskill_ID` int DEFAULT NULL,
  `Level` int DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `Current_Course_ID` (`Current_Course_ID`),
  KEY `Current_Module_ID` (`Current_Module_ID`),
  KEY `Current_Subskill_ID` (`Current_Subskill_ID`),
  CONSTRAINT `USERS_PROGRESS_ibfk_1` FOREIGN KEY (`Current_Course_ID`) REFERENCES `COURSES` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `USERS_PROGRESS_ibfk_2` FOREIGN KEY (`Current_Module_ID`) REFERENCES `MODULES` (`ID`) ON DELETE CASCADE,
  CONSTRAINT `USERS_PROGRESS_ibfk_3` FOREIGN KEY (`Current_Subskill_ID`) REFERENCES `SUBSKILLS` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS_PROGRESS`
--

LOCK TABLES `USERS_PROGRESS` WRITE;
/*!40000 ALTER TABLE `USERS_PROGRESS` DISABLE KEYS */;
INSERT INTO `USERS_PROGRESS` VALUES (1,1,1,2,1,NULL,NULL);
/*!40000 ALTER TABLE `USERS_PROGRESS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 18:06:31
