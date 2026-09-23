import {Container} from "inversify";

const container = new Container();

//any class
type ServiceClass = abstract new (...args: any[]) => any;

type ServiceModule = Record<string, ServiceClass>;

//get service files
const files = import.meta.glob<ServiceModule>("./**/*.ts", {
    eager: true,
});


for (const file of Object.values(files)) {
    for (const exportedClass of Object.values(file)) {
        container
            .bind(exportedClass)
            .toSelf()
            .inSingletonScope()
    }
}

/*
container
    .bind(ApiService)
    .toSelf()
    .inSingletonScope()

container
    .bind(ProductService)
    .toSelf()
    .inSingletonScope()

 */

export { container };