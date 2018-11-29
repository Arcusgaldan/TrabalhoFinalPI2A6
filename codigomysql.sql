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
  `nome` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBUsuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBUsuario` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBUsuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `prontuario` CHAR(10) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  `senha` VARCHAR(300) NOT NULL,
  `curriculoLattes` VARCHAR(300) NOT NULL,
  `foto` VARCHAR(200) NULL,
  `data` DATE NULL,
  `primeiroAcesso` TINYINT NOT NULL,
  `codTipoUsuario` INT NOT NULL,
  PRIMARY KEY (`id`, `codTipoUsuario`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_TBUsuario_TBTipoUsuario1_idx` (`codTipoUsuario` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `prontuario_UNIQUE` (`prontuario` ASC),
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
  `nome` VARCHAR(80) NOT NULL,
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
  `senhaAntiga` VARCHAR(64) NOT NULL,
  `data` DATETIME NOT NULL,
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
  `link` VARCHAR(64) NOT NULL,
  `data` DATE NOT NULL,
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
  `status` VARCHAR(20) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `sigla` VARCHAR(10) NOT NULL,
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
  `data` DATETIME NOT NULL,
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
  `titulo` TEXT NOT NULL,
  `texto` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBPronn`.`TBTecnico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBPronn`.`TBTecnico` ;

CREATE TABLE IF NOT EXISTS `DBPronn`.`TBTecnico` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `atividade` VARCHAR(100) NOT NULL,
  `formacao` VARCHAR(200) NOT NULL,
  `anoConclusao` VARCHAR(4) NOT NULL,
  `nomeCurso` VARCHAR(300) NULL,
  `linkLattes` VARCHAR(300) NOT NULL,
  `foto` VARCHAR(200) NULL,
  `dataEntrada` DATE NOT NULL,
  `dataSaida` DATE NOT NULL,
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
  `formacao` VARCHAR(200) NOT NULL,
  `anoConclusao` VARCHAR(4) NOT NULL,
  `nomeCurso` VARCHAR(300) NULL,
  `linkLattes` VARCHAR(300) NOT NULL,
  `foto` VARCHAR(200) NULL,
  `dataEntrada` DATE NOT NULL,
  `dataSaida` DATE NULL,
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
  `titulo` VARCHAR(300) NOT NULL,
  `dataInicio` DATE NOT NULL,
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
  `tipo` VARCHAR(100) NOT NULL,
  `atual` INT NOT NULL,
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
  `nome` VARCHAR(100) NOT NULL,
  `descricao` TEXT NOT NULL,
  `dataEntrada` DATE NOT NULL,
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
  `titulo` VARCHAR(300) NOT NULL,
  `tipo` VARCHAR(100) NOT NULL,
  `data` DATE NOT NULL,
  `referencia` TEXT NOT NULL,
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



INSERT INTO TBTipoUsuario (id, nome) VALUES (1, "Lider");
INSERT INTO TBTipoUsuario (id, nome) VALUES (2, "Administrador");

INSERT INTO TBTextoIndex (id, titulo, texto) VALUES (1, "Cadastramento de grupos de pesquisa", "A Pró-Reitoria de Pesquisa, Inovação e Pós-Graduação (PRP) é a responsável pelo cadastramento no Diretório dos Grupos de Pesquisa no Brasil, no Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq), e mantém a relação dos grupos cadastrados no link Grupos de Pesquisa do IFSP.
A Portaria nº 1.718, de 5 de maio de 2017, estabeleceu o novo regulamento dos Grupos de Pesquisa Institucionais e está disponível para consulta no link Grupos de Pesquisa da PRP. Conforme o Art. 17 desta Portaria, para a proposta de criação de grupo deverá ser utilizado o formulário de Grupo de Pesquisa Institucional, disponível no link supracitado, a ser encaminhado pelo primeiro líder ao presidente do Compesq do câmpus por e-mail para pesquisa.brt@ifsp.edu.br, com a indicação do assunto “Criação de Grupo de Pesquisa”. Devem constar as seguintes informações no corpo da mensagem:
• nome do grupo de pesquisa;
• nome do primeiro líder, titulação, câmpus de lotação e n.º do CPF;
• nome e titulação dos membros pesquisadores;
• linhas de pesquisa;
• justificativa para a formação do grupo, demonstrando a relevância e as perspectivas de contribuição científica, tecnológica, artística ou cultural em até 600 caracteres, incluindo os espaços;
• justificativa para atipicidade, se for o caso, considerando os termos do Art. 23 da referida Portaria, em até 200 caracteres, incluindo os espaços;
• descrição do grupo de, no máximo, 400 caracteres, incluindo os espaços, para ser apresentada na página da PRP, junto com a logomarca.
É importante que o primeiro líder, antes de enviar a proposta, observe o disposto no Art. 9.º e no Art. 30 da referida Portaria");

INSERT INTO TBTextoIndex (id, titulo, texto) VALUES (2, "Produção Científica e Tecnológica", "Dados referentes às produções científica e tecnológica dos servidores do câmpus podem ser consultados na pasta abaixo. Essas informações foram extraídas da Plataforma Lattes do CNPq, a partir da Plataforma Stela Experta, e são válidas até a data indicada no nome do arquivo.");

INSERT INTO `tbusuario` (`id`, `prontuario`, `nome`, `email`, `senha`, `curriculoLattes`, `foto`, `data`, `primeiroAcesso`, `codTipoUsuario`) VALUES ('0', '1690320', 'Tiago', 'admin@email.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'lattes.com/tiago', 'C:\\Foto', '2018-07-17', '0', '2'), ('0', '1690311', 'Lider de Grupo ', 'lider@email.com', 'c9200fcde58c80962a416040d0c8300fce7d43e4924cb5eb733adfc7b475d557', 'lattes.com/lider_de_grupo', 'C:\\FotoLider', '2018-05-10', '0', '1');