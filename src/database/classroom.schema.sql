-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema classroom
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema classroom
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `classroom` DEFAULT CHARACTER SET utf8;

USE `classroom`;

-- -----------------------------------------------------
-- Table `classroom`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `classroom`.`Users` (
    `idUser` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(45) NOT NULL, `email` VARCHAR(45) NOT NULL, `password` VARCHAR(100) NOT NULL, PRIMARY KEY (`idUser`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `classroom`.`Subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `classroom`.`Subjects` (
    `idSubject` INT NOT NULL AUTO_INCREMENT, `subjectName` VARCHAR(45) NOT NULL, `idTeacher` INT NOT NULL, `code` VARCHAR(45) NOT NULL, PRIMARY KEY (`idSubject`), INDEX `id_teacher_idx` (`idTeacher` ASC) VISIBLE, CONSTRAINT `id_teacherSubject` FOREIGN KEY (`idTeacher`) REFERENCES `classroom`.`Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `classroom`.`EnrolledSubjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `classroom`.`EnrolledSubjects` (
    `idSubject` INT NOT NULL, `idStudent` INT NOT NULL, INDEX `id_student_idx` (`idStudent` ASC) VISIBLE, CONSTRAINT `id_studentEnrolledSubject` FOREIGN KEY (`idStudent`) REFERENCES `classroom`.`Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `classroom`.`Works`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `classroom`.`Works` (
    `idWork` INT NOT NULL AUTO_INCREMENT, `idSubject` INT NOT NULL, `workName` VARCHAR(45) NOT NULL, `description` VARCHAR(100) NULL, `date` DATE NULL, PRIMARY KEY (`idWork`), INDEX `id_subject_idx` (`idSubject` ASC) VISIBLE, CONSTRAINT `id_subjectWork` FOREIGN KEY (`idSubject`) REFERENCES `classroom`.`Subjects` (`idSubject`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `classroom`.`Pendings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `classroom`.`Pendings` (
    `idPendings` INT NOT NULL AUTO_INCREMENT, `idWork` INT NOT NULL, `idUser` INT NOT NULL, `state` TINYINT NULL, PRIMARY KEY (`idPendings`), INDEX `id_work_idx` (`idWork` ASC) VISIBLE, INDEX `id_user_idx` (`idUser` ASC) VISIBLE, CONSTRAINT `id_workPending` FOREIGN KEY (`idWork`) REFERENCES `classroom`.`Works` (`idWork`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `id_userPending` FOREIGN KEY (`idUser`) REFERENCES `classroom`.`Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `classroom`.`Publications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `classroom`.`Publications` (
    `idPublication` INT NOT NULL AUTO_INCREMENT, `idSubject` INT NOT NULL, `idUser` INT NOT NULL, `description` VARCHAR(100) NOT NULL, PRIMARY KEY (`idPublication`), INDEX `id_user_idx` (`idUser` ASC) VISIBLE, INDEX `id_subject_idx` (`idSubject` ASC) VISIBLE, CONSTRAINT `id_userPublication` FOREIGN KEY (`idUser`) REFERENCES `classroom`.`Users` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `id_subjectPublication` FOREIGN KEY (`idSubject`) REFERENCES `classroom`.`Subjects` (`idSubject`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;