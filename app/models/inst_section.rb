class InstSection < ActiveRecord::Base
  #~ Relationships ............................................................
  belongs_to :inst_chapter_module
  has_many :inst_book_section_exercises
  has_many :odsa_student_extensions
  has_many :odsa_user_interactions
  has_many :inst_books_by_inst_book_section_exercises, :source => :inst_book, :through => :inst_book_section_exercises
  has_many :users_by_odsa_student_extensions, :source => :user, :through => :odsa_student_extensions
  has_many :inst_book_section_exercises_by_odsa_user_interactions, :source => :inst_book_section_exercise, :through => :odsa_user_interactions
  has_many :inst_books_by_odsa_user_interactions, :source => :inst_book, :through => :odsa_user_interactions
  has_many :users_by_odsa_user_interactions, :source => :user, :through => :odsa_user_interactions

  #~ Validation ...............................................................

  #~ Constants ................................................................
  #~ Hooks ....................................................................
  #~ Class methods ............................................................
  def self.save_data_from_json(book, module_rec, inst_chapter_module_rec, section_name, section_obj, section_position)
    inst_sec = InstSection.new
    inst_sec.inst_module_id = module_rec.id
    inst_sec.inst_chapter_module_id = inst_chapter_module_rec.id
    inst_sec.name = section_name
    inst_sec.show = section_obj['showsection'] || false
    inst_sec.save

    section_obj.each do |k, v|
     InstExercise.save_data_from_json(book, inst_sec, k, v) if v.is_a?(Hash) && !v.empty?
    end
  end
  #~ Instance methods .........................................................

  # -------------------------------------------------------------
  # TODO
  # check that only one child exercise in inst_book_section_exercises table
  # is gradable (has points > 0)
  def one_gradable_ex_only

  end

  # -------------------------------------------------------------
  # return the gradable exercise name from inst_exercises table and
  # id from inst_book_section_exercises table
  def get_gradable_ex
    inst_bk_sec_ex = InstBookSectionExercise.where("inst_section_id = ? AND points > 0", id).first
    inst_ex = InstExercise.where(id: inst_bk_sec_ex['inst_exercise_id']).first
    {'ex_name' => inst_ex.short_name, "inst_bk_sec_ex" => inst_bk_sec_ex.id}
  end

  #~ Private instance methods .................................................
end