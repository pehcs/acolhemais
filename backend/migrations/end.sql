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
  `id` INT NOT NULL AUTO_INCREMENT,
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

CREATE TABLE IF NOT EXISTS `acolhemais`.`beneficiarios_visitantes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `generos_id` INT NULL DEFAULT NULL,
  `racas_id` INT NULL DEFAULT NULL,
  `sexualidades_id` INT NULL DEFAULT NULL,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `endereco` VARCHAR(250) NULL DEFAULT NULL,
  `observacao` VARCHAR(3000) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_beneficiarios_visitantes_racas1_idx` (`racas_id` ASC) VISIBLE,
  INDEX `fk_beneficiarios_visitantes_generos1_idx` (`generos_id` ASC) VISIBLE,
  INDEX `fk_beneficiarios_visitantes_sexualidades1_idx` (`sexualidades_id` ASC) VISIBLE,
  CONSTRAINT `fk_beneficiarios_visitantes_racas1`
    FOREIGN KEY (`racas_id`)
    REFERENCES `acolhemais`.`racas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_beneficiarios_visitantes_generos1`
    FOREIGN KEY (`generos_id`)
    REFERENCES `acolhemais`.`generos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_beneficiarios_visitantes_sexualidades1`
    FOREIGN KEY (`sexualidades_id`)
    REFERENCES `acolhemais`.`sexualidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`necessidades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `necessidade` VARCHAR(100) NOT NULL,
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
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`imagens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipos_imagens_id` INT NOT NULL,
  `ongs_id` INT NULL DEFAULT NULL,
  `acoes_id` INT NULL DEFAULT NULL,
  `beneficiarios_locais_id` INT NULL DEFAULT NULL,
  `necessidades_id` INT NULL DEFAULT NULL,
  `url` VARCHAR(250) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `tipos_imagens_id`),
  INDEX `fk_imagens_ongs1_idx` (`ongs_id` ASC) VISIBLE,
  INDEX `fk_imagens_acoes1_idx` (`acoes_id` ASC) VISIBLE,
  INDEX `fk_imagens_tipos_imagens1_idx` (`tipos_imagens_id` ASC) VISIBLE,
  INDEX `fk_imagens_beneficiarios_locais1_idx` (`beneficiarios_locais_id` ASC) VISIBLE,
  INDEX `fk_imagens_necessidades1_idx` (`necessidades_id` ASC) VISIBLE,
  CONSTRAINT `fk_imagens_ongs1`
    FOREIGN KEY (`ongs_id`)
    REFERENCES `acolhemais`.`ongs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_imagens_acoes1`
    FOREIGN KEY (`acoes_id`)
    REFERENCES `acolhemais`.`acoes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_imagens_tipos_imagens1`
    FOREIGN KEY (`tipos_imagens_id`)
    REFERENCES `acolhemais`.`tipos_imagens` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_imagens_beneficiarios_locais1`
    FOREIGN KEY (`beneficiarios_locais_id`)
    REFERENCES `acolhemais`.`beneficiarios_locais` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_imagens_necessidades1`
    FOREIGN KEY (`necessidades_id`)
    REFERENCES `acolhemais`.`necessidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`acoes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ongs_id` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `data` DATE NOT NULL,
  `hora` TIME NOT NULL,
  `localizacao` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(3000) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `ongs_id`),
  INDEX `fk_acoes_ongs1_idx` (`ongs_id` ASC) VISIBLE,
  CONSTRAINT `fk_acoes_ongs1`
    FOREIGN KEY (`ongs_id`)
    REFERENCES `acolhemais`.`ongs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`beneficiarios_locais` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `upn` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `generos_id` INT NULL DEFAULT NULL,
  `racas_id` INT NULL DEFAULT NULL,
  `sexualidades_id` INT NULL DEFAULT NULL,
  `nome` VARCHAR(45) NULL DEFAULT NULL,
  `endereco` VARCHAR(45) NULL DEFAULT NULL,
  `observacao` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_beneficiarios_locais_generos1_idx` (`generos_id` ASC) VISIBLE,
  INDEX `fk_beneficiarios_locais_racas1_idx` (`racas_id` ASC) VISIBLE,
  INDEX `fk_beneficiarios_locais_sexualidades1_idx` (`sexualidades_id` ASC) VISIBLE,
  CONSTRAINT `fk_beneficiarios_locais_generos1`
    FOREIGN KEY (`generos_id`)
    REFERENCES `acolhemais`.`generos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_beneficiarios_locais_racas1`
    FOREIGN KEY (`racas_id`)
    REFERENCES `acolhemais`.`racas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_beneficiarios_locais_sexualidades1`
    FOREIGN KEY (`sexualidades_id`)
    REFERENCES `acolhemais`.`sexualidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`generos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `genero` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `genero_UNIQUE` (`genero` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`racas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `raca` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `raca_UNIQUE` (`raca` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`generos_ongs` (
  `generos_id` INT NOT NULL,
  `ongs_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`generos_id`, `ongs_id`),
  INDEX `fk_generos_ongs_ongs1_idx` (`ongs_id` ASC) VISIBLE,
  CONSTRAINT `fk_generos_entidades_generos1`
    FOREIGN KEY (`generos_id`)
    REFERENCES `acolhemais`.`generos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_generos_ongs_ongs1`
    FOREIGN KEY (`ongs_id`)
    REFERENCES `acolhemais`.`ongs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`racas_ongs` (
  `racas_id` INT NOT NULL,
  `ongs_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`racas_id`, `ongs_id`),
  INDEX `fk_racas_entidades_ongs1_idx` (`ongs_id` ASC) VISIBLE,
  CONSTRAINT `fk_racas_entidades_racas1`
    FOREIGN KEY (`racas_id`)
    REFERENCES `acolhemais`.`racas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_racas_entidades_ongs1`
    FOREIGN KEY (`ongs_id`)
    REFERENCES `acolhemais`.`ongs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`tipos_imagens` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `tipo_UNIQUE` (`tipo` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`racas_acoes` (
  `racas_id` INT NOT NULL,
  `acoes_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`racas_id`, `acoes_id`),
  INDEX `fk_racas_acoes_acoes1_idx` (`acoes_id` ASC) VISIBLE,
  CONSTRAINT `fk_racas_entidades_racas10`
    FOREIGN KEY (`racas_id`)
    REFERENCES `acolhemais`.`racas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_racas_acoes_acoes1`
    FOREIGN KEY (`acoes_id`)
    REFERENCES `acolhemais`.`acoes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`generos_acoes` (
  `generos_id` INT NOT NULL,
  `acoes_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`generos_id`, `acoes_id`),
  INDEX `fk_generos_acoes_acoes1_idx` (`acoes_id` ASC) VISIBLE,
  CONSTRAINT `fk_generos_entidades_generos10`
    FOREIGN KEY (`generos_id`)
    REFERENCES `acolhemais`.`generos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_generos_acoes_acoes1`
    FOREIGN KEY (`acoes_id`)
    REFERENCES `acolhemais`.`acoes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`sexualidades` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sexualidade` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `raca_UNIQUE` (`sexualidade` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`necessidades_acoes` (
  `necessidades_id` INT NOT NULL,
  `acoes_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`necessidades_id`, `acoes_id`),
  INDEX `fk_necessidades_acoes_acoes1_idx` (`acoes_id` ASC) VISIBLE,
  CONSTRAINT `fk_necessidades_acoes_necessidades1`
    FOREIGN KEY (`necessidades_id`)
    REFERENCES `acolhemais`.`necessidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_necessidades_acoes_acoes1`
    FOREIGN KEY (`acoes_id`)
    REFERENCES `acolhemais`.`acoes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`necessidades_ben_locais` (
  `necessidades_id` INT NOT NULL,
  `beneficiarios_locais_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`necessidades_id`, `beneficiarios_locais_id`),
  INDEX `fk_necessidades_ben_locais_beneficiarios_locais1_idx` (`beneficiarios_locais_id` ASC) VISIBLE,
  CONSTRAINT `fk_necessidades_ben_locais_necessidades1`
    FOREIGN KEY (`necessidades_id`)
    REFERENCES `acolhemais`.`necessidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_necessidades_ben_locais_beneficiarios_locais1`
    FOREIGN KEY (`beneficiarios_locais_id`)
    REFERENCES `acolhemais`.`beneficiarios_locais` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`necessidades_ben_visitantes` (
  `necessidades_id` INT NOT NULL,
  `beneficiarios_visitantes_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`necessidades_id`, `beneficiarios_visitantes_id`),
  INDEX `fk_necessidades_ben_visitantes_beneficiarios_visitantes1_idx` (`beneficiarios_visitantes_id` ASC) VISIBLE,
  CONSTRAINT `fk_necessidades_ben_visitantes_necessidades1`
    FOREIGN KEY (`necessidades_id`)
    REFERENCES `acolhemais`.`necessidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_necessidades_ben_visitantes_beneficiarios_visitantes1`
    FOREIGN KEY (`beneficiarios_visitantes_id`)
    REFERENCES `acolhemais`.`beneficiarios_visitantes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`necessidades_ongs` (
  `necessidades_id` INT NOT NULL,
  `ongs_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`necessidades_id`, `ongs_id`),
  INDEX `fk_necessidades_ongs_necessidades1_idx` (`necessidades_id` ASC) VISIBLE,
  CONSTRAINT `fk_necessidades_ongs_ongs1`
    FOREIGN KEY (`ongs_id`)
    REFERENCES `acolhemais`.`ongs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_necessidades_ongs_necessidades1`
    FOREIGN KEY (`necessidades_id`)
    REFERENCES `acolhemais`.`necessidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`sexualidades_acoes` (
  `sexualidades_id` INT NOT NULL,
  `acoes_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sexualidades_id`, `acoes_id`),
  INDEX `fk_sexualidades_acoes_sexualidades1_idx` (`sexualidades_id` ASC) VISIBLE,
  CONSTRAINT `fk_sexualidades_acoes_acoes1`
    FOREIGN KEY (`acoes_id`)
    REFERENCES `acolhemais`.`acoes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sexualidades_acoes_sexualidades1`
    FOREIGN KEY (`sexualidades_id`)
    REFERENCES `acolhemais`.`sexualidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS `acolhemais`.`sexualidades_ongs` (
  `sexualidades_id` INT NOT NULL,
  `ongs_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sexualidades_id`, `ongs_id`),
  INDEX `fk_sexualidades_ongs_sexualidades1_idx` (`sexualidades_id` ASC) VISIBLE,
  CONSTRAINT `fk_sexualidades_ongs_ongs`
    FOREIGN KEY (`ongs_id`)
    REFERENCES `acolhemais`.`ongs` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sexualidades_ongs_sexualidades1`
    FOREIGN KEY (`sexualidades_id`)
    REFERENCES `acolhemais`.`sexualidades` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
