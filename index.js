import  express  from "express";
import { request } from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app =express();
const PORT= process.env.PORT;
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL ;
async function createConnection()
 {const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected ✌️😊");
   return client;
}
 const client = await createConnection();


const movies =[{"id":"100","name":"Thuppaki","poster":"https://flxt.tmsimg.com/assets/p9561344_p_v10_ab.jpg","summary":"An army captain visits Mumbai to be with his family and find a suitable bride. However, an explosion in the city sets him off on a mission to find and disable a terrorist sleeper cell in the city.","rating":9.5},{"id":"101","name":"Jai Bhim","poster":"https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg","summary":"A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case","rating":9.6},{"id":"102","name":"Mersal","poster":"https://m.media-amazon.com/images/M/MV5BNGI4NTM2OTAtYmY2Ny00MTAzLTk4ZWMtZmQ4Y2RhNWJmNDQ1XkEyXkFqcGdeQXVyOTA0NTIzNzU@._V1_.jpg","summary":"Maaran, a doctor, is falsely arrested for the murder of his colleague, Dr Arjun Zachariah. He soon discovers that the real culprit is a lookalike who aims to expose corruption in the medical industry.","rating":8.5},{"id":"103","name":"Soorarai pottru","poster":"https://m.media-amazon.com/images/M/MV5BOGVjYmM0ZWEtNTFjNi00MWZjLTk3OTItMmFjMDAzZWU1ZDVjXkEyXkFqcGdeQXVyMTI2Mzk1ODg0._V1_.jpg","summary":"Maara, a young man from a remote village, dreams of launching his own airline service. However, he must overcome several obstacles and challenges in order to be successful in his quest.","rating":8.8},{"id":"104","name":"Bigil","poster":"https://www.pinkvilla.com/files/styles/ld-image/public/bigil_0.jpg","summary":"Michael, an aggressive young man, gives up his dream of becoming a footballer after his father's murder. However, a friend convinces him to coach a women's football team and turn his life around.","rating":8.7},{"id":"105","name":"RRR","poster":"https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG","rating":8.8,"summary":"RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments."},{"id":"106","name":"Iron man 3","poster":"http://prodimage.images-bn.com/pimages/9781302370121_p0_v1_s1200x630.jpg","rating":7,"summary":"With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy."},{"id":"107","name":"pariyerum perumal","poster":"https://m.media-amazon.com/images/M/MV5BZGFhOTkxYzUtZjdhNi00YTEyLTgyNzMtZGU3YTc5NDUyYTYwXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_.jpg","rating":9.1,"summary":"Pariyan, a law student belonging to a lower caste, falls in love with Jothi, a girl from an upper caste. However, their relationship irks Jothi's family members who harass Pariyan to no end."},{"id":"108","name":"The Avengers","rating":7,"summary":"Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.","poster":"https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg"},{"id":"109","name":"Interstellar","poster":"https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg","rating":8.6,"summary":"When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans."},{"id":"110","name":"Baahubali","poster":"https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg","rating":8,"summary":"In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy."},{"name":"maanadu","rating":"8.2","summary":"On the day of a public conference by the state's Chief Minister, his bodyguard and a police officer become stuck in a time loop.","poster":"https://www.filmibeat.com/img/popcorn/movie_posters/maanaadu-20201123114538-17309.jpg","id":"111"},{"name":"kanna","rating":"9,5","summary":"Kousalya, a farmer's daughter, dreams of becoming an international cricketer and winning the Cricket World Cup. She faces various challenges as she pursues her dream with the support of her father.","poster":"https://upload.wikimedia.org/wikipedia/en/e/e6/Kanaa_Movie_Poster.jpg","id":"112"},{"name":"Etharkkum Thunindhavan","rating":"8.8","summary":"Etharkkum Thunindhavan, also known under the initialism ET, is an upcoming Indian Tamil-language action thriller film written and directed by Pandiraj and produced by Sun Pictures. The film stars Suriya, Priyanka Arul Mohan, and Vinay Rai","poster":"https://www.indiaherald.com/Assets/ArticleUpload/2021111922637959_FEhJih8VUAUGhDX.jfif","id":"113"}];

app.get("/",function(request,response){
    response.send("hello this is lee fullstack developer");
})

app.get("/movies", async function(request,response){
    const movies = await client.db("b30wd").collection("movies").find({}).toArray() ;
    response.send(movies)
  });
  
app.get("/movies/:id", async  function(request,response){
    console.log(request.params);
    const {id}=request.params;
   const movie = await client.db("b30wd").collection("movies").findOne({id:id});
   console.log(movie);
   movie  
    ? response.send(movie)
    : response.status(404).send({message:"no such movie here"});
   })
  
  
   app.put("/movies/:id", async function (request, response) {
    const updateData = request.body;
     console.log(request.params);// db.movies.updateOne({id: "102"}, {$set: upadateData})
     const { id } = request.params;
     
     const result = await client.db("b30wd").collection("movies").updateOne({ id: id }, { $set: updateData });
     response.send(result);
    })
    
    
     app.post("/movies",  async function(request,response){
        const data=request.body;  
        console.log(data);
       const result = await client.db("b30wd").collection("movies").insertMany(data);
       response.send(result);
      }) 

      app.listen(PORT,()=>console.log(`sever is started ${PORT}`))