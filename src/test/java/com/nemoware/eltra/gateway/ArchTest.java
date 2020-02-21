package com.nemoware.eltra.gateway;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.nemoware.eltra.gateway");

        noClasses()
            .that()
                .resideInAnyPackage("com.nemoware.eltra.gateway.service..")
            .or()
                .resideInAnyPackage("com.nemoware.eltra.gateway.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..com.nemoware.eltra.gateway.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
