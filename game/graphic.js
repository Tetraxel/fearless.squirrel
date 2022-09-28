function init()
{
    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

    noGround = [];
    groundTiles = [];
    ground = new Ground(0xffffff, WIDTH, HEIGHT, 10);

    console.log(groundTiles)
    const half = Math.ceil(groundTiles.length / 2);
    newGroundTiles = (groundTiles.slice(half)).concat(groundTiles.slice(0, half))
    groundTiles = newGroundTiles
    console.log(groundTiles)
    

    coords = [50, 0]
    for (let i = 0; i < groundTiles.length; i++) {
        const el1 = groundTiles[i];
        var ok = true
        for (let j = 0; j < noGround.length; j++) {
            const el2 = noGround[j];
            if (el1[0] == el2[0] && el1[1] == el2[1]) {
                ok = false
                break
            }
        }
        if (ok) {
            coords = groundTiles[i]
            break
        }
    }
    console.log(coords)
    
    player1 = new Player("player1", 0xffff00, new THREE.Vector2(coords[0], coords[1]), 0);
    scene.add(player1.graphic);
    
    ennemy1 = new Ennemy("ennemy1", 0xff00ff, new THREE.Vector2(0, 0), 0);
    scene.add(ennemy1.graphic);

    light1 = new Light("sun", 0xffffff, "0,0,340");
    scene.add(light1);
}

function Ground(color, size_x, size_y, nb_tile)
{
    colors = Array(0xff0000, 0x00ff00, 0x0000ff, 0x000000);

    sizeOfTileX = size_x / nb_tile;
    minX = -(size_x/2) - 10;
    maxX = (size_x/2);
    
    sizeOfTileY = size_y / nb_tile;
    minY = -(size_y/2) - 10;
    maxY = (size_y/2);

    for (x = minX; x <= maxX; x = x+sizeOfTileX){
        for (y = minY; y <= maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];
       
            if (0x000000 != color)
            {
                tmpGround = new THREE.Mesh(
                new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                tmpGround.position.x = x;
                tmpGround.position.y = y;
                scene.add(tmpGround);
                groundTiles.push([x, y]);
            }
            else
                noGround.push([x, y]);
        }
    }
    console.log(noGround)
    console.log(groundTiles)
}

function Light(name, color, position)
{
    pointLight = new THREE.PointLight(color, 50, 1000);

    pointLight.position.x = position.split(',')[0];
    pointLight.position.y = position.split(',')[1];
    pointLight.position.z = position.split(',')[2];

    return pointLight;
}
