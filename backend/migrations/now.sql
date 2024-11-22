-- MySQL Workbench Synchronization
-- Generated: 2024-11-21 21:42
-- Version: 1.0
-- Project: acolhe+
-- Author: alberson alison de araujo

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS 'acolhemais';
CREATE SCHEMA IF NOT EXISTS `acolhemais` DEFAULT CHARACTER SET utf8mb4 ;

USE 'acolhemais';

CREATE TABLE IF NOT EXISTS `acolhemais`.`ongs` (
  `id` INT NOT NULL,
  `upn` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `decricao` VARCHAR(3000) NOT NULL,
  `cnpj` VARCHAR(30) NULL DEFAULT NULL,
  `localizacao` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`ong_contato` (
  `tipos_contato_id` INT NOT NULL,
  `ongs_id` INT NOT NULL,
  `valor` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`tipos_contato_id`, `ongs_id`),
  INDEX `fk_ong_contato_ongs1_idx` (`ongs_id` ASC) VISIBLE,
  CONSTRAINT `fk_ong_contato_tipos_contato`
    FOREIGN KEY (`tipos_contato_id`)
    REFERENCES `acolhemais`.`tipos_contatos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ong_contato_ongs1`
    FOREIGN KEY (`ongs_id`)
    REFERENCES `acolhemais`.`ongs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`tipos_contatos` (
  `id` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
