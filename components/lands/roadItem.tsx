import { propsOffset } from "../../constants/tiles";
import { CityProps, TileData } from "../../types/land";
import React, { ReactElement, memo, useMemo, useState } from "react";
import { PlaneGeometry, Texture } from "three";
import { Tileset } from "../../types/ldtk";

type IElem = {
  tileset: Tileset;
  pos: { posX: number; posY: number };
  buildingTexture: Texture;
  propData: CityProps;
  tileData: TileData;
  plane: PlaneGeometry;
};

const RoadItem = memo<IElem>(
  ({
    tileset,
    pos,
    buildingTexture,
    propData,
    tileData,
    plane,
  }): ReactElement => {
    const [offset, setOffset] = useState<{ x: number; y: number; z: number }>({
      x: 0,
      y: 0,
      z: 0,
    });

    const elemTexture = useMemo(() => {
      if (tileset && buildingTexture) {
        // console.log("tileData", tileData);
        const localT = buildingTexture.clone();
        localT.needsUpdate = true;
        localT.offset.set(tileData.textureOffset.x, tileData.textureOffset.y);
        localT.repeat.set(tileData.textureRepeat.x, tileData.textureRepeat.y);

        const offset = propsOffset[tileData.entity.identifier][propData.corner];
        if (offset) setOffset(offset);

        return localT;
      }
    }, [buildingTexture, tileset]);

    return (
      <mesh
        position={[
          pos.posX + offset.x,
          0.22 + offset.z + propData.z + pos.posY * 0.02,
          pos.posY - 1 + offset.y,
        ]}
        name={`${tileData.entity.tileRect.tilesetUid}_props`.toString()}
        rotation={[-Math.PI * 0.5, 0, 0]}
        geometry={plane}
      >
        <meshPhongMaterial
          attach="material"
          map={elemTexture}
          name={
            `${tileData.entity.tileRect.tilesetUid}_props`.toString() + "_mat"
          }
          transparent={true}
          depthWrite={false}
          depthTest={true}
        />
      </mesh>
    );
  }
);

RoadItem.displayName = "RoadItem";
export default RoadItem;