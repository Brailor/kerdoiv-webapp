# Adatbázis migrációjának leírása

## Fontos, hogy legyen egy aktív mongo connection mielőtt futtatnánk a lentebb tárgyalt parancsokat, valamint, hogy legyen adminsztrátori hozzáférésünk

1.  Első lépés:

    > mongodump --db <adatbázis neve, amit migrálni akarunk> --out <a hely, ahová migrálni akarjuk az adatbázist>

2.  Második lépés:

    > mongorestore --db <adatbázis neve, amit majd törölni fogunk> --drop <a fájl, amit előbb migráltunk>

3.  Done
