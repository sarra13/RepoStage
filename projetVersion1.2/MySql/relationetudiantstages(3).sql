-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  mer. 12 fév. 2020 à 15:22
-- Version du serveur :  10.4.11-MariaDB
-- Version de PHP :  7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `testdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `relationetudiantstages`
--

CREATE TABLE `relationetudiantstages` (
  `id` int(11) NOT NULL,
  `numetu` int(11) DEFAULT NULL,
  `numIDStage` int(11) DEFAULT NULL,
  `datedebut` date DEFAULT NULL,
  `datefin` date DEFAULT NULL,
  `nomResponsable` varchar(240) DEFAULT NULL,
  `Semestre` int(11) DEFAULT NULL,
  `DES` int(11) NOT NULL,
  `numIDTerrain` int(11) NOT NULL,
  `nomMaitreDeStage1` varchar(240) DEFAULT NULL,
  `nomMaitreDeStage2` varchar(240) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `relationetudiantstages`
--

INSERT INTO `relationetudiantstages` (`id`, `numetu`, `numIDStage`, `datedebut`, `datefin`, `nomResponsable`, `Semestre`, `DES`, `numIDTerrain`, `nomMaitreDeStage1`, `nomMaitreDeStage2`) VALUES
(1, 4, 1, '2019-12-29', '2019-12-30', '2 ', 1, 1, 1, '1', '3'),
(2, 4, 4, '2020-02-19', '2020-02-20', '2 ', 1, 2, 0, NULL, NULL),
(3, 4, 1, '1970-01-01', '1970-01-01', '3 ', 1, 3, 0, NULL, NULL),
(4, 4, 1, NULL, NULL, NULL, 2, 1, 0, NULL, NULL),
(5, 4, 4, '1970-01-28', '1970-01-01', '1 ', 2, 2, 0, NULL, NULL),
(6, 4, 3, NULL, NULL, NULL, 2, 3, 0, NULL, NULL),
(7, 7, 4, '2020-10-09', '2020-09-13', '1  ', 1, 1, 0, NULL, NULL),
(8, 7, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL),
(9, 7, NULL, NULL, NULL, NULL, 1, 2, 0, NULL, NULL),
(10, 7, NULL, NULL, NULL, NULL, 2, 2, 0, NULL, NULL),
(11, 7, NULL, NULL, NULL, NULL, 1, 3, 0, NULL, NULL),
(12, 7, NULL, NULL, NULL, NULL, 2, 3, 0, NULL, NULL),
(13, 8, NULL, NULL, NULL, NULL, 1, 1, 0, NULL, NULL),
(14, 8, NULL, NULL, NULL, NULL, 2, 1, 0, NULL, NULL),
(15, 8, NULL, NULL, NULL, NULL, 1, 2, 0, NULL, NULL),
(16, 8, NULL, NULL, NULL, NULL, 2, 2, 0, NULL, NULL),
(17, 8, NULL, NULL, NULL, NULL, 1, 3, 0, NULL, NULL),
(18, 8, NULL, NULL, NULL, NULL, 2, 3, 0, NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `relationetudiantstages`
--
ALTER TABLE `relationetudiantstages`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `relationetudiantstages`
--
ALTER TABLE `relationetudiantstages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
