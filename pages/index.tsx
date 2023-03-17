import type { NextPage } from "next";
import * as style from "@yareyaredesuyo/dicebear-animal-crossing-style";
// import * as style from "@dicebear/big-smile";

import React from "react";
import { createAvatar } from "@dicebear/avatars";
import { v4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import absoluteUrl from "next-absolute-url";

import { toFormat, toInlineSvg} from "../libs/converter";
import Image from 'next/image'
import {useWindowSize} from 'react-use';

interface DiceProps {
  key: string;
  title: string;
  default: Array<string>;
}

function parse(): Array<DiceProps> {
  let props: Array<DiceProps> = [];

  // @ts-ignore
  // console.log(Object.keys(style.schema.properties).sort())

  //   @ts-ignore
  Object.keys(style.schema.properties).forEach((key) => {
    // @ts-ignore
    const value = style.schema.properties[key];
    const dice = {
      key,
      // @ts-ignore
      title: value.title,
      // @ts-ignore
      default: value.default,
    } as DiceProps;
    props.push(dice);
  });

  props.sort((a, b) => (a.key > b.key) ? 1 : -1)

  return props;
}

const SEED = "3";

const Template: NextPage = ({
  origin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [data, setData] = React.useState<Array<DiceProps>>([]);

  const [options, setOptions] = React.useState([]);
  const [avatarImageRaw, setAvatarImageRaw] = React.useState("");
  const [seed, setSeed] = React.useState(SEED);
  const {width, height} = useWindowSize();

  React.useEffect(() => {
    setData(parse());
    setSeed(v4());
    setAvatarImageRaw(createAvatar(style, { seed, ...options }));
  }, []);

  React.useEffect(() => {
    setAvatarImageRaw(createAvatar(style, { seed, ...options }));
  }, [options]);

  React.useEffect(() => {
    setAvatarImageRaw(createAvatar(style, { seed, ...options }));
  }, [seed]);

  function getImageUrl() {
    const downloadOption = Object.entries(options)
      .map(([k, v]) => `${k}[]=${encodeURI(v)}`)
      .join("&");

    // console.log(
    //   `${window.location.origin}/api/animal?seed=${seed}&filetype=png&${downloadOption}`
    // );

    return `${window.location.origin}/api/animalCrossing?seed=${seed}&filetype=png&${downloadOption}`;
  }

  return (
    // <div className="flex flex-col min-h-screen mx-auto container w-full max-w-sm md:max-w-lg">
    <div className="flex flex-row justify-between">
      <Toaster position="bottom-right" />
      <aside className="sidebar w-48 md:shadow transform md:translate-x-0 max-h-screen overflow-y-scroll bg-cyan-700">
        <div className="mt-14 flex flex-col justify-center">
          {data.map((d) => (
            <div className="mb-5" key={d.key}>
              {/* <div>{d.key}</div> */}
              <div className="mb-2 ml-5">{d.title}</div>
              <div className="flex justify-center">
                <select
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      [d.key]: [e.target.value],
                    })
                  }
                  className="select select-sm w-40"
                >
                  <option disabled selected>
                    {d.title}
                  </option>
                  {d?.default?.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <div className="flex flex-col justify-center bg-cyan-800 flex-grow min-w-fit">

      {/* <div className="flex flex-col justify-center bg-cyan-800 flex-grow min-w-full md:ml-0"> */}
        <div className="flex justify-center mb-6">
          {/* <Image src={toInlineSvg(avatarImageRaw)} width={width <= 480 ? "256" : "512"} height={width <= 480 ? "256" : "512"} alt="animal" /> */}
          <Image src={toInlineSvg(avatarImageRaw)} width="512" height="512" alt="animal" />

        </div>

          
        <div className="grid grid-cols-1 md:grid-cols-4 justify-center items-center ">
          <button
            className="btn btn-outline mb-6 justify-self-center"
            onClick={() => (
              setSeed(v4())
            )}
          >
            random
          </button>

          <button
            className="btn btn-outline mb-6 justify-self-center"
            onClick={() => {
              const link = document.createElement("a");
              link.download = "animal.svg";
              link.href = toInlineSvg(avatarImageRaw);
              link.click();
            }}
          >
            save svg
          </button>

          <button
            className="btn btn-outline mb-6 justify-self-center"
            onClick={async () => {
              try {
                const format = toFormat(avatarImageRaw, "png");
                await format.toFile("animal.png")
              } catch (e) {}
            }}
          >
            save png
          </button>

          <button
            className="btn btn-outline mb-6 justify-self-center"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(getImageUrl());
                toast("copied!", {
                  duration: 2000,
                });
              } catch (e) {}
            }}
          >
            copy image url
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
};

// TODO: support url
export const getServerSideProps: GetServerSideProps = async (context) => {
  // const { origin } = absoluteUrl(context.req);
  const origin = "test";

  return {
    props: {
      origin,
    }, // will be passed to the page component as props
  };
};

export default Template;
