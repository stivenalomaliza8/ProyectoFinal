import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Anuncios } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {
  private filePath: any;
  private AnuncioCollection: AngularFirestoreCollection<Anuncios>;
  private anuncio: Observable<Anuncios[]>;
  public img:string[]=[];
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.AnuncioCollection = db.collection<Anuncios>('anuncios');
    this.anuncio = this.AnuncioCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  updateImg(img:File,anuncio:Anuncios,index:number){
    this.filePath = `imagenes/${uuidv4()}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, img);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImagen => {
            if(  anuncio.imagen[index]!=null){
              anuncio.imagen[index] = urlImagen;
              this.updateAnuncio(anuncio);
            }else{
              anuncio.imagen[anuncio.imagen.length] = urlImagen;
              this.updateAnuncio(anuncio);
            }
           
          })
        })
      ).subscribe(
      );
  }
  saveImg(img:File){
    if(this.img.length<=5){
    this.filePath = `imagenes/${uuidv4()}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, img);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImagen => {
            this.img[this.img.length]=urlImagen;
          })
        })
      ).subscribe(
      );
    }
  }
  getAnuncios() {
    return this.anuncio;
   
  }
  getAnuncio(id: string) {
    return this.AnuncioCollection.doc<Anuncios>(id).valueChanges(); 

  }
  inserAnuncio(anuncio: Anuncios) {
    anuncio.imagen=this.img;
    this.img=[];
    return this.AnuncioCollection.add(anuncio);
   
  }
  deleteAnuncio(id: string) {
    return this.AnuncioCollection.doc(id).delete();
  }
  updateAnuncio(anuncio: Anuncios) {
    anuncio.imagen=this.img;
    this.img=[];
    const res =  this.AnuncioCollection.doc(anuncio.id).update(anuncio);
    
 
  }
}
