<template>
<!-- <div class="container"> -->
    

                    <div class="col-md-6">

                       <div class="p-3 card">

                        <div class="d-flex justify-content-between align-items-center p-3 music">
                             
                            <div class="d-flex flex-row align-items-center">

                               
                                <small class="ml-2" id="albumTitle"> {{ album.title }} </small>
                                
                            </div>
                             <div class="d-flex flex-row align-items-center">

                                
                                <small class="ml-3" id="albumDescription"> {{ album.description }} </small>
                                
                            </div>  
                             <div class="d-flex flex-row align-items-center">

                              
                                <small class="ml-4" id="albumReleasedYear"> {{ album.releasedYear }} </small>
                                
                            </div>
                            <i class="fa fa-check color"></i>
                        </div>                  
                                    
                       </div>  
                        
                    </div>
              <!-- </div> -->
</template>

<script>

export default {
  props: {
    album: Object
  },
  data() {
    return {
      
    };
  },
  methods: {

    // deleteLesson() {
    //   this.$emit("deleteLesson");
    // },
    // updateLesson() {
    //   this.$emit("updateLesson");
    // }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

body{

    background-color: #f3f3f3;
    font-family: "Poppins", sans-serif
}

.container{

    height: 100vh;
}

.card{
    background-color: #212529;
    border:none;
}

#albumTitle{
    color: white;
    padding-left: 10px;
}
#albumDescription{
    color: white;
    padding-left: 10px;
}
#albumReleasedYear{
    color: white;
    padding-left: 10px;
}
.cant{

    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

}

.music{

    margin-bottom: 10px;
}


.music:hover{

    background-color: #f7f7f7;
    border-radius: 3px;
    cursor: pointer;
}


.color{

    color: #ff7e3d;
}

.playlist{
        height: 51px;
}


.btn-danger {
    color: #fff;
    background-color: #ff7e3d;
    border-color: #ff7e3d;
}


.btn-danger:hover , 
.btn-danger:active  {
    color: #fff;
    background-color: #ff7e3d;
    border-color: #ff7e3d;
}



.btn-danger:focus{
    box-shadow: none;
}
</style>