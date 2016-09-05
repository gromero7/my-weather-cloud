-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Temps de generació: 30-05-2016 a les 21:42:23
-- Versió del servidor: 5.5.41-0ubuntu0.14.04.1
-- Versió de PHP: 5.5.9-1ubuntu4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de dades: `daw1618`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `new`
--

CREATE TABLE IF NOT EXISTS `new` (
  `new_id` int(4) NOT NULL AUTO_INCREMENT,
  `title` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `description` varchar(4000) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `photo_new_path` varchar(100) DEFAULT NULL,
  `font` varchar(250) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`new_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Bolcant dades de la taula `new`
--

INSERT INTO `new` (`new_id`, `title`, `description`, `photo_new_path`, `font`, `date`) VALUES
(1, 'Welcome to My weather Cloud', 'Welcome to my weather cloud. A webapp where you can upload your photos, weather station data, etc. ENJOY!.', 'images/news/sun.png', 'My Weather Cloud', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de la taula `photo`
--

CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int(4) NOT NULL AUTO_INCREMENT,
  `user_id` int(3) NOT NULL,
  `photo_name` varchar(40) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `photo_path` varchar(100) NOT NULL,
  `photo_location` varchar(30) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `photo_type` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `photo_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `photo_path` (`photo_path`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=56 ;

-- --------------------------------------------------------

--
-- Estructura de la taula `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `surname` varchar(25) DEFAULT NULL,
  `nickname` varchar(25) NOT NULL,
  `location` varchar(30) DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `birthday` date DEFAULT NULL,
  `password` varchar(64) NOT NULL,
  `privileges` tinyint(1) DEFAULT NULL,
  `newsletter` tinyint(1) DEFAULT NULL,
  `avatar_path` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=35 ;

--
-- Bolcant dades de la taula `user`
--

INSERT INTO `user` (`user_id`, `name`, `surname`, `nickname`, `location`, `email`, `birthday`, `password`, `privileges`, `newsletter`, `avatar_path`) VALUES
(1, 'Admin', '', 'mwcadministration', 'Barcelona, EspaÃ±a', 'myweathercloudstaff@gmail.com', '2016-05-02', '7b5e98a6e9ea1a0329d7810103e642189344e780d5efb0e78151afb9a2179597', 1, 0, 'images/profile/photo/1/administrator-icon-10.png');

-- --------------------------------------------------------

--
-- Estructura de la taula `weather_station`
--

CREATE TABLE IF NOT EXISTS `weather_station` (
  `weather_id` int(3) NOT NULL AUTO_INCREMENT,
  `user_id` int(3) NOT NULL,
  `log_path` varchar(100) NOT NULL,
  PRIMARY KEY (`weather_id`),
  UNIQUE KEY `user_id_2` (`user_id`),
  UNIQUE KEY `log_path` (`log_path`),
  UNIQUE KEY `weather_id` (`weather_id`),
  KEY `user_id` (`user_id`),
  KEY `user_id_3` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=78 ;

--
-- Restriccions per taules bolcades
--

--
-- Restriccions per la taula `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restriccions per la taula `weather_station`
--
ALTER TABLE `weather_station`
  ADD CONSTRAINT `weather_station_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
