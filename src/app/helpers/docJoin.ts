import { AngularFirestore } from "@angular/fire/compat/firestore";
import { combineLatest, defer, switchMap } from "rxjs";


export const docJoin = (
    db: AngularFirestore,
    paths: { [key:string]:string}
) => {
    return (source:any) =>
    defer(() => {
        console.log('calling function');
        let parent: any;
        const keys = Object.keys(paths);
        console.log(keys);

        return source.pipe(
            switchMap(data => {
                parent = data;

                const docs$ = keys.map(k=> {
                    const fullPath = `${paths[k]}/${parent[k]}`;
                    console.log(fullPath);
                    return db.doc(fullPath).valueChanges();
                })
                return combineLatest(docs$);
            })
        )
    })
}