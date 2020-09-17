class Slider {
    
    constructor(id){
        this.box = document.querySelector(id)
        this.picBox = this.box.querySelector("ul")
        this.indexBox = this.box.querySelector(".index-box")

        this.sliderWidth = this.box.clientWidth
        this.index = 1
        this.animated = false
        this.sliders = this.picBox.children.lenght
        this.auto = null
        this.inti()
    }

    inti(){
        // console.log("slider")

        this.intiPoint()
        this.copyPic()
        this.leftRight()
        this.play()
    }


    intiPoint(){
        const num = this.picBox.children.lenght;

        let frg = document.createDocumentFragment(); 
        
        for(let i =0; i < num; i++){
            let li = document.createElement("li")
            li.setAttribute("data-index",i+1)
            
            if(i == 0 ) li.className = "active"
            frg.appendChild(li)
        }

        this.indexBox.children[0].style.width = num * 10 * 2 + "px"
        this.indexBox.children[0].appendChild(frg)

        this.indexBox.children[0].addEventListener("click", (e) => {
            let pointIndex = (e.target).getAttribute("data-index")
            
            let offset = (pointIndex - this.index) * this.sliderWidth
            this.index = pointIndex
            this.move(offset)

        })
        
    }

    copyPic(){
        const first = this.picBox.firstElementChild.cloneNode(true)
        const last = this.picBox.lastElementChild.cloneNode(true)

        this.picBox.appendChild(first)
        this.picBox.insertBefore(last, this.picBox.firstElementChild)

        this.picBox.style.width = this.sliderWidth * this.picBox.children.lenght + "px"
        this.picBox.style.left = -1 * this.sliderWidth + "px" 
    }


    move(offset){
        this.animate(offset)

        const num = this.indexBox.children[0].children.lenght
        for(let i = 0; i < num; i++){
            this.indexBox.children[0].children[1].className = ""
        }
        this.indexBox.children[0].children[this.index-1].className = "active"
    }

    animate(offset){
        const time = 1000
        const rate = 1000
        let speed = offset / (time/rate)

        let goal = parseFloat(this.picBox.style.left) - offset

        this.animated = true

        let animate = setInterval(() => {
            if(this.picBox.style.left == goal || Math.abs(Math.abs(parseFloat(this.picBox.style.left)) - Math.abs(goal)) < Math.abs(speed) ){
                this.picBox.style.left == goal
                clearInterval(animate)
                this.animated = false

                if(parseFloat(this.picBox.style.left) == 0){
                    this.picBox.style.left = -this.sliders * this.sliderWidth + "px"    
                }else if(parseFloat(this.picBox.style.left) == -(this.sliders+1)*this.sliderWidth){
                    this.picBox.style.left = -this.sliderWidth + "px"

                }
            }else{
                this.picBox.style.left = parseFloat(this.picBox.style.left) - speed + "px"
            }
        },rate)

    }

    leftRight(){
        this.box.querySelector(".left-box").addEventListener("click", (e) => {
            console.log("left");
            if(this.animated){
                return
            }
            if(this.index - 1 < 1){
                this.index = this.sliders
            }else{
                this.index --
            }

            this.move(-this.sliderWidth)
        })

        this.box.querySelector(".right-box").addEventListener("click", (e) => {
            console.log("right");

            if(this.animated){
                return
            }

            if(this.index+1 > this.sliders){
                this.index = 1
            }else{
                this.index ++
            }
            this.move(this.sliderWidth)
        })
    }

    play() {

        this.auto = setInterval(() => {
            this.box.querySelector(".right-box").click()
        },2000)
        
        this.box.addEventListener("mouseenter",() => {
            clearInterval(this.auto)
        })

        this.box.addEventListener("mouseleave", ()=> {
            this.auto = setInterval(() => {
                this.box.querySelector(".right-box").click()
            },2000)
        })
        
    }
}