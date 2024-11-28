-- CreateTable
CREATE TABLE `ong` (
    `id` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(3000) NOT NULL,
    `cnpj` VARCHAR(14) NULL,
    `localizacao` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `fk_ong_login_idx`(`login`),
    INDEX `fk_ong_nome_idx`(`nome`),
    INDEX `fk_ong_cnpj_idx`(`cnpj`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ong_contato` (
    `tipos_contato_id` VARCHAR(191) NOT NULL,
    `ong_id` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `fk_ong_contato_valor_idx`(`valor`),
    PRIMARY KEY (`tipos_contato_id`, `ong_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_contato` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ong_contato` ADD CONSTRAINT `ong_contato_tipos_contato_id_fkey` FOREIGN KEY (`tipos_contato_id`) REFERENCES `tipos_contato`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ong_contato` ADD CONSTRAINT `ong_contato_ong_id_fkey` FOREIGN KEY (`ong_id`) REFERENCES `ong`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
