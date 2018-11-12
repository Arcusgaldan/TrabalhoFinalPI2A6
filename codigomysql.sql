-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
DROP TABLE IF EXISTS `DBPronn`.`TBTipoUsuario` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBTipoUsuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(20) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBUsuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBUsuario` ;

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
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  CONSTRAINT `fk_TBUsuario_TBTipoUsuario1`
    FOREIGN KEY (`codTipoUsuario`)
    REFERENCES `DBPronn`.`TBTipoUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBPermissao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBPermissao` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBPermissao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(80) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBPermissaoUsuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBPermissaoUsuario` ;

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
DROP TABLE IF EXISTS `DBPronn`.`TBHistoricoSenha` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBHistoricoSenha` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codUsuario` INT NOT NULL,
  `senhaAntiga` VARCHAR(64) NULL,
  `data` DATETIME NULL,
  PRIMARY KEY (`id`, `codUsuario`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_TBHistoricoSenha_TBUsuario1`
    FOREIGN KEY (`codUsuario`)
    REFERENCES `DBPronn`.`TBUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBLinkResetSenha`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBLinkResetSenha` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBLinkResetSenha` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `link` VARCHAR(64) NULL,
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


-- -----------------------------------------------------
-- Table `DBPronn`.`TBGrupo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBGrupo` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBGrupo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(20) NULL,
  `nome` VARCHAR(100) NULL,
  `sigla` VARCHAR(10) NULL,
  `descricao` TEXT NULL,
  `dataFundacao` DATE NULL,
  `codUsuario` INT NOT NULL,
  `logotipo` VARCHAR(300) NULL,
  `email` VARCHAR(200) NULL,
  PRIMARY KEY (`id`, `codUsuario`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_TBGrupo_TBUsuario1_idx` (`codUsuario` ASC),
  UNIQUE INDEX `sigla_UNIQUE` (`sigla` ASC),
  CONSTRAINT `fk_TBGrupo_TBUsuario1`
    FOREIGN KEY (`codUsuario`)
    REFERENCES `DBPronn`.`TBUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBLogLider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBLogLider` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBLogLider` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` DATETIME NULL,
  `codGrupo` INT NOT NULL,
  `novoLider` INT NOT NULL,
  PRIMARY KEY (`id`, `codGrupo`, `novoLider`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_TBLogLider_TBGrupo1_idx` (`codGrupo` ASC),
  INDEX `fk_TBLogLider_TBUsuario1_idx` (`novoLider` ASC),
  CONSTRAINT `fk_TBLogLider_TBGrupo1`
    FOREIGN KEY (`codGrupo`)
    REFERENCES `DBPronn`.`TBGrupo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TBLogLider_TBUsuario1`
    FOREIGN KEY (`novoLider`)
    REFERENCES `DBPronn`.`TBUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBTextoIndex`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBTextoIndex` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBTextoIndex` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` TEXT NULL,
  `texto` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBTecnico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBTecnico` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBTecnico` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `atividade` VARCHAR(100) NULL,
  `formacao` VARCHAR(200) NULL,
  `anoConclusao` VARCHAR(4) NULL,
  `nomeCurso` VARCHAR(300) NULL,
  `linkLattes` VARCHAR(300) NULL,
  `foto` VARCHAR(200) NULL,
  `dataEntrada` DATE NULL,
  `codGrupo` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`, `codGrupo`),
  INDEX `fk_TBTecnico_TBGrupo1_idx` (`codGrupo` ASC),
  CONSTRAINT `fk_TBTecnico_TBGrupo1`
    FOREIGN KEY (`codGrupo`)
    REFERENCES `DBPronn`.`TBGrupo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBDocente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBDocente` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBDocente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `formacao` VARCHAR(200) NULL,
  `anoConclusao` VARCHAR(4) NULL,
  `nomeCurso` VARCHAR(300) NULL,
  `linkLattes` VARCHAR(300) NULL,
  `foto` VARCHAR(200) NULL,
  `dataEntrada` DATE NULL,
  `codGrupo` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_TBDocente_TBGrupo1_idx` (`codGrupo` ASC),
  CONSTRAINT `fk_TBDocente_TBGrupo1`
    FOREIGN KEY (`codGrupo`)
    REFERENCES `DBPronn`.`TBGrupo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBLinhaPesquisa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBLinhaPesquisa` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBLinhaPesquisa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(300) NOT NULL,
  `grau` INT NOT NULL,
  `personalizada` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBVinculoGrupoLinha`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBVinculoGrupoLinha` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBVinculoGrupoLinha` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dataInicio` DATE NOT NULL,
  `dataFim` DATE NULL,
  `codGrupo` INT NOT NULL,
  `codLinha` INT NOT NULL,
  PRIMARY KEY (`id`, `codLinha`, `codGrupo`),
  INDEX `fk_TBVinculoGrupoLinha_TBGrupo1_idx` (`codGrupo` ASC),
  INDEX `fk_TBVinculoGrupoLinha_TBLinhaPesquisa1_idx` (`codLinha` ASC),
  CONSTRAINT `fk_TBVinculoGrupoLinha_TBGrupo1`
    FOREIGN KEY (`codGrupo`)
    REFERENCES `DBPronn`.`TBGrupo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TBVinculoGrupoLinha_TBLinhaPesquisa1`
    FOREIGN KEY (`codLinha`)
    REFERENCES `DBPronn`.`TBLinhaPesquisa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBVinculoDocenteLinha`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBVinculoDocenteLinha` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBVinculoDocenteLinha` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dataInicio` DATE NOT NULL,
  `dataFim` DATE NULL,
  `codDocente` INT NOT NULL,
  `codLinha` INT NOT NULL,
  PRIMARY KEY (`id`, `codLinha`, `codDocente`),
  INDEX `fk_TBVinculoDocenteLinha_TBDocente1_idx` (`codDocente` ASC),
  INDEX `fk_TBVinculoDocenteLinha_TBLinhaPesquisa1_idx` (`codLinha` ASC),
  CONSTRAINT `fk_TBVinculoDocenteLinha_TBDocente1`
    FOREIGN KEY (`codDocente`)
    REFERENCES `DBPronn`.`TBDocente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TBVinculoDocenteLinha_TBLinhaPesquisa1`
    FOREIGN KEY (`codLinha`)
    REFERENCES `DBPronn`.`TBLinhaPesquisa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBPesquisa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBPesquisa` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBPesquisa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(300) NULL,
  `dataInicio` DATE NULL,
  `dataFim` DATE NULL,
  `codDocente` INT NOT NULL,
  `codLinha` INT NOT NULL,
  PRIMARY KEY (`id`, `codDocente`, `codLinha`),
  INDEX `fk_TBPesquisa_TBDocente1_idx` (`codDocente` ASC),
  INDEX `fk_TBPesquisa_TBLinhaPesquisa1_idx` (`codLinha` ASC),
  CONSTRAINT `fk_TBPesquisa_TBDocente1`
    FOREIGN KEY (`codDocente`)
    REFERENCES `DBPronn`.`TBDocente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TBPesquisa_TBLinhaPesquisa1`
    FOREIGN KEY (`codLinha`)
    REFERENCES `DBPronn`.`TBLinhaPesquisa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBAluno`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBAluno` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBAluno` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `curso` VARCHAR(200) NOT NULL,
  `linkLattes` VARCHAR(300) NOT NULL,
  `dataInicio` DATE NOT NULL,
  `dataFim` DATE NULL,
  `codPesquisa` INT NOT NULL,
  `atual` TINYINT NOT NULL,
  `tipo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`, `codPesquisa`),
  INDEX `fk_TBAluno_TBPesquisa1_idx` (`codPesquisa` ASC),
  CONSTRAINT `fk_TBAluno_TBPesquisa1`
    FOREIGN KEY (`codPesquisa`)
    REFERENCES `DBPronn`.`TBPesquisa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBEquipamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBEquipamento` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBEquipamento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  `descricao` TEXT NULL,
  `dataEntrada` DATE NULL,
  `dataDescarte` DATE NULL,
  `codGrupo` INT NOT NULL,
  PRIMARY KEY (`id`, `codGrupo`),
  INDEX `fk_TBEquipamento_TBGrupo1_idx` (`codGrupo` ASC),
  CONSTRAINT `fk_TBEquipamento_TBGrupo1`
    FOREIGN KEY (`codGrupo`)
    REFERENCES `DBPronn`.`TBGrupo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBPublicacao`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBPublicacao` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBPublicacao` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(300) NULL,
  `tipo` VARCHAR(100) NULL,
  `data` DATE NULL,
  `referencia` TEXT NULL,
  `codDocente` INT NOT NULL,
  `codPesquisa` INT NULL,
  `codLinha` INT NOT NULL,
  PRIMARY KEY (`id`, `codDocente`, `codLinha`),
  INDEX `fk_TBPublicacao_TBDocente1_idx` (`codDocente` ASC),
  INDEX `fk_TBPublicacao_TBPesquisa1_idx` (`codPesquisa` ASC),
  INDEX `fk_TBPublicacao_TBLinhaPesquisa1_idx` (`codLinha` ASC),
  CONSTRAINT `fk_TBPublicacao_TBDocente1`
    FOREIGN KEY (`codDocente`)
    REFERENCES `DBPronn`.`TBDocente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TBPublicacao_TBPesquisa1`
    FOREIGN KEY (`codPesquisa`)
    REFERENCES `DBPronn`.`TBPesquisa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TBPublicacao_TBLinhaPesquisa1`
    FOREIGN KEY (`codLinha`)
    REFERENCES `DBPronn`.`TBLinhaPesquisa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
