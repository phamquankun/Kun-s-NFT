import { HolderOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setResult, setStep } from "../../redux/slice/createNFTSlice";

interface PreviewNFTProps {
  tree?: any;
}

const PreviewNFT: React.FunctionComponent<PreviewNFTProps> = ({ tree }) => {
  const router = useRouter();
  const disptach = useDispatch();
  const [indexImage, setIndexImage] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [size, setSize] = useState<number>(10);
  const handlePreview = () => {
    if (indexImage < 10) {
      setIndexImage(indexImage + 1);
    } else {
      setIndexImage(1);
    }
  };

  const handleClear = () => {
    fetch("/api/removeFolder")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data?.title) {
          disptach(setStep(2.1));
          disptach(setResult({}));
        }
      });
  };
  const handleGenerate = () => {
    router.push(`/api/images?size=${size}`);
    fetch(`/api/images?size=${size}`).then((response) => {
      if (response.status === 200) {
        disptach(setStep(2.3));
        fetch("/api/removeFolder");
      }
    });
  };
  const handleChangeInput = (e: any, value: string) => {
    if (value === "Number to generate") {
      setSize(parseInt(e.target.value) as number);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsDisabled(false);
    }, 10000);
  }, []);
  return (
    <>
      <div className="preview-nft">
        <div className="preview-nft__row-1">
          {[
            { label: "Number to generate", value: "10" },
            { label: "Base art name", value: "NFT #" },
            { label: "Mint Cost", value: "0.005" },
            { label: "Royalties", value: "2.5" },
          ].map((item, index) => (
            <div className="form-input" key={index}>
              <span>{item.label}</span>
              <Input
                defaultValue={item.value}
                onChange={(e) => handleChangeInput(e, item.label)}
              />
            </div>
          ))}
        </div>
        <div className="preview-nft__row-2">
          <div className="layer-order">
            <h2>Layer order</h2>
            <div className="wrap">
              {[
                "Background",
                "Face",
                "Left Eye",
                "Right Eye",
                "Mouth",
                "Accessory",
              ].map((item, index) => (
                <div className="wrap__items" key={index}>
                  <span>{index + 1}</span>
                  <div className="layer">
                    <span>{item}</span>
                    <div className="percent">
                      <span>100</span>
                      <span>%</span>
                    </div>
                  </div>
                  <HolderOutlined />
                </div>
              ))}
            </div>
          </div>
          <div className="rarity-percentage">
            <h2>Rarity percentage</h2>
            <div className="wrap">
              {[
                {
                  label: "Common",
                  value: 50,
                },
                {
                  label: "Lengendary",
                  value: 5,
                },
                {
                  label: "Rare",
                  value: 20,
                },
                {
                  label: "Super Rare",
                  value: 25,
                },
              ].map((item, index) => (
                <div className="items" key={index}>
                  <span>{item.label}</span>
                  <div className="percent">
                    <InputNumber
                      addonAfter="%"
                      disabled
                      defaultValue={item.value}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="preview-image">
            <Image
              alt=""
              src={`/images/output_random_nft/NFT-${indexImage}.png`}
              width={350}
              height={350}
            />
            <Button onClick={() => handlePreview()}>Preview</Button>
          </div>
        </div>
        <div className="preview-nft__row-3">
          <Button
            onClick={() => handleGenerate()}
            disabled={isDisabled}
            loading={isDisabled}
          >
            Generate
          </Button>
          <Button onClick={() => handleClear()}>Clear</Button>
        </div>
      </div>
    </>
  );
};

export default PreviewNFT;
