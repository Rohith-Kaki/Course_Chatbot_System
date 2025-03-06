import CourseCard from "../../components/Cards/Card";
import AI from "../../Assests/CourseImages/ai_thumnail.png";
import Finance from "../../Assests/CourseImages/Finance.png";
import Marketing from "../../Assests/CourseImages/marketingthumbnail.png";

const app = () => {
  return (
    <div className="mx-auto w-full">
      <div className="">
        {/* technology */}
        <div id='Technology' className="ml-28 inline-block font-workSans font-bold text-2xl text-white text-center px-12 py-4 bg-primary rounded-3xl">
          Technology
        </div>
        {/* technology_cards */}
        <div className="flex flex-wrap gap-8 justify-center">
            <CourseCard
            coursetitle="PYTHON"
            courseDescription="Lorem ipsum dolor ipsum dignissimos illo quod sunt expedita, nostrum sapiente nobis eius, aperiam minus modi nisi dolorum mollitia?"
            courseButton="OPEN NOW"
            image={AI}
            school="school_of_technology"
            course="python"
            />
            <CourseCard
            coursetitle="MACHINE LEARNING"
            courseDescription="Lorem ipsum dolor ipsum dignissimos illo quod sunt expedita, nostrum sapiente nobis eius, aperiam minus modi nisi dolorum mollitia?"
            courseButton="OPEN NOW"
            image={Finance}
            school="school_of_technology"
            course="ml"
            />
            <CourseCard
            coursetitle="JAVA"
            courseDescription="Lorem ipsum dolor ipsum dignissimos illo quod sunt expedita, nostrum sapiente nobis eius, aperiam minus modi nisi dolorum mollitia?"
            courseButton="OPEN NOW"
            image={Marketing}
            school="school_of_technology"
            course="java"
            />
            <CourseCard
            coursetitle="ARTIFICIAL INTELLIGENCE"
            courseDescription="Lorem ipsum dolor ipsum dignissimos illo quod sunt expedita, nostrum sapiente nobis eius, aperiam minus modi nisi dolorum mollitia?"
            courseButton="OPEN NOW"
            image={Marketing}
            school="school_of_technology"
            course="ai"
            />
        </div>
      </div>
    </div>
  );
};

export default app;
