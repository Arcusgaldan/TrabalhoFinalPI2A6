-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema DBPronn
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DBPronn
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DBPronn` DEFAULT CHARACTER SET utf8 ;
USE `DBPronn` ;

-- -----------------------------------------------------
-- Table `DBPronn`.`TBTipoUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBPronn`.`TBTipoUsuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBPronn`.`TBUsuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `prontuario` CHAR(10) NULL,
  `nome` VARCHAR(100) NULL,
  `email` VARCHAR(80) NULL,
  `senha` VARCHAR(300) NULL,
  `curriculoLattes` VARCHAR(300) NULL,
  `foto` VARCHAR(200) NULL,
  `data` DATE NULL,
  `primeiroAcesso` TINYINT NULL,
  `codTipoUsuario` INT NOT NULL,
  PRIMARY KEY (`id`, `codTipoUsuario`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_TBUsuario_TBTipoUsuario1_idx` (`codTipoUsuario` ASC),
  CONSTRAINT `fk_TBUsuario_TBTipoUsuario1`
    FOREIGN KEY (`codTipoUsuario`)
    REFERENCES `DBPronn`.`TBTipoUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBPermissao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBPronn`.`TBPermissao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBPermissaoUsuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBPronn`.`TBPermissaoUsuario` (
  `codTipoUsuario` INT NOT NULL,
  `codPermissao` INT NOT NULL,
  INDEX `fk_TBPermissaoUsuario_TBTipoUsuario_idx` (`codTipoUsuario` ASC),
  INDEX `fk_TBPermissaoUsuario_TBPermissao1_idx` (`codPermissao` ASC),
  CONSTRAINT `fk_TBPermissaoUsuario_TBTipoUsuario`
    FOREIGN KEY (`codTipoUsuario`)
    REFERENCES `DBPronn`.`TBTipoUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TBPermissaoUsuario_TBPermissao1`
    FOREIGN KEY (`codPermissao`)
    REFERENCES `DBPronn`.`TBPermissao` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBHistoricoSenha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBPronn`.`TBHistoricoSenha` (
  `senhaAntiga` VARCHAR(300) NULL,
  `data` DATETIME NULL,
  `codUsuario` INT NOT NULL,
  PRIMARY KEY (`codUsuario`),
  CONSTRAINT `fk_TBHistoricoSenha_TBUsuario1`
    FOREIGN KEY (`codUsuario`)
    REFERENCES `DBPronn`.`TBUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBLinkResetSenha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBPronn`.`TBLinkResetSenha` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(12) NULL,
  `data` DATE NULL,
  `codUsuario` INT NOT NULL,
  PRIMARY KEY (`id`, `codUsuario`),
  INDEX `fk_TBLinkResetSenha_TBUsuario1_idx` (`codUsuario` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_TBLinkResetSenha_TBUsuario1`
    FOREIGN KEY (`codUsuario`)
    REFERENCES `DBPronn`.`TBUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
